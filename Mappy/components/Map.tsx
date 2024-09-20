import React, { useState, useRef, useMemo, useEffect } from 'react';
import MapboxGL from '@rnmapbox/maps';
import { MapView, Camera, VectorSource, FillLayer } from '@rnmapbox/maps';
import BottomSheet from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import countries from '../assets/countries.json';
import BottomSheetContent from './BottomSheetContent';
import { getUserData } from '~/services/authService';
import {
  addVisitedCountry,
  addWantToVisitCountry,
  getVisitedCountry,
  getWantToVisitCountries,
  removeVisitedCountry,
  removeWantToVisitCountry,
} from '~/services/apiService';

MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

const Map = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);
  const [wantToVisitCountries, setWantToVisitCountries] = useState<string[]>([]);

  const mapRef = useRef<MapboxGL.MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%'], []);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const userData = await getUserData(); 
        if (userData && userData.id) {
          const userId = userData.id;

          // Fetch visited countries and want to visit countries
          const visitedResponse = await getVisitedCountry(userId);
          const wishlistResponse = await getWantToVisitCountries(userId);

          // Extract country codes
          setVisitedCountries(visitedResponse.map((country) => country.country_code));
          setWantToVisitCountries(wishlistResponse.map((country) => country.country_code));
        }
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountryData();
  }, []);

  const handleCountrySelection = async (event) => {
    // ! return later
    const { properties } = event;
    if (!properties || !mapRef.current) return;

    const { screenPointX, screenPointY } = properties;
    const features = await mapRef.current.queryRenderedFeaturesAtPoint(
      [screenPointX, screenPointY],
      undefined,
      ['country-fill']
    );

    if (features?.features?.length) {
      setSelectedCountry(features.features[0]); // ! return later
      bottomSheetRef.current?.expand();
    }
  };

  const updateCountryStatus = async (isoCode: string, listType: 'visited' | 'wishlist') => {
    const userData = await getUserData(); 
    if (!userData || !userData.id) return; 

    const userId = userData.id;

    try {
      console.log('Updating status for:', isoCode, 'List type:', listType);
      console.log('Before update:', visitedCountries, wantToVisitCountries);

      if (listType === 'visited') {
        if (visitedCountries.includes(isoCode)) {
          await removeVisitedCountry(userId, isoCode); // Remove from visited in backend
          setVisitedCountries((prev) => prev.filter((code) => code !== isoCode)); // Remove from local state
        } else {
          await addVisitedCountry(userId, isoCode); // Add to visited in backend
          setVisitedCountries((prev) => [...prev, isoCode]); // Add to local state
        }
      } else if (listType === 'wishlist') {
        if (wantToVisitCountries.includes(isoCode)) {
          await removeWantToVisitCountry(userId, isoCode); // Remove from wishlist in backend
          setWantToVisitCountries((prev) => prev.filter((code) => code !== isoCode)); // Remove from local state
        } else {
          await addWantToVisitCountry(userId, isoCode); // Add to wishlist in backend
          setWantToVisitCountries((prev) => [...prev, isoCode]); // Add to local state
        }
      }
    } catch (error) {
      console.error('Error updating country status:', error);
    }
  };

  const getCountryName = (isoCode: string) => {
    const country = countries.find((c) => c.iso_3166_1_alpha_3 === isoCode);
    return country?.name || 'Unknown Country';
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        styleURL="mapbox://styles/mapbox/light-v11"
        onPress={handleCountrySelection}>
        <Camera followZoomLevel={8} centerCoordinate={[0, 20]} />
        <VectorSource id="countrySource" url="mapbox://mapbox.country-boundaries-v1">
          <FillLayer
            id="country-fill"
            sourceLayerID="country_boundaries"
            style={{
              fillColor: [
                'case',
                ['in', ['get', 'iso_3166_1_alpha_3'], ['literal', visitedCountries]],
                '#0000FF',
                ['in', ['get', 'iso_3166_1_alpha_3'], ['literal', wantToVisitCountries]],
                '#FFA500',
                '#CCCCCC',
              ],
              fillOpacity: [
                'case',
                ['in', ['get', 'iso_3166_1_alpha_3'], ['literal', visitedCountries]],
                0.5, 
                ['in', ['get', 'iso_3166_1_alpha_3'], ['literal', wantToVisitCountries]],
                0.5, 
                0, 
              ],
            }}
          />
        </VectorSource>
      </MapView>
      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints} enablePanDownToClose>
        <BottomSheetContent
          selectedCountry={selectedCountry}
          visitedCountries={visitedCountries}
          wantToVisitCountries={wantToVisitCountries}
          getCountryName={getCountryName}
          updateCountryStatus={updateCountryStatus}
        />
      </BottomSheet>
    </>
  );
};

export default Map;
