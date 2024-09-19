import React, { useState, useRef, useMemo } from 'react';
import MapboxGL from '@rnmapbox/maps';
import { MapView, Camera, VectorSource, FillLayer } from '@rnmapbox/maps';
import BottomSheet from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import countries from '../assets/countries.json';
import BottomSheetContent from './BottomSheetContent';

MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

type CountryStatus = {
  visited: string[]; // Array of country ISO codes
  wishlist: string[]; // Array of country ISO codes
};

const Map: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryStatus, setCountryStatus] = useState<CountryStatus>({
    visited: [],
    wishlist: [],
  });
  const mapRef = useRef<MapboxGL.MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%'], []);

  const handleCountrySelection = async (event) => { // ! return later
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

  const updateCountryStatus = (isoCode: string, statusType: 'visited' | 'wishlist') => {
    setCountryStatus((prev) => {
      // Get the other status type (either 'visited' or 'wishlist')
      const otherStatusType = statusType === 'visited' ? 'wishlist' : 'visited';

      const isInCurrentList = prev[statusType].includes(isoCode);
      const isInOtherList = prev[otherStatusType].includes(isoCode);
      // ! come back later to complete
      return {
        ...prev,
        // Toggle the country in the current list (add or remove)
        [statusType]: isInCurrentList
          ? prev[statusType].filter((code) => code !== isoCode) // Remove if already in list
          : [...prev[statusType], isoCode], // Add if not in list
        // Ensure the country is removed from the other list
        [otherStatusType]: isInOtherList
          ? prev[otherStatusType].filter((code) => code !== isoCode) // Remove from the other list
          : prev[otherStatusType],
      };
    });
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
        <Camera followZoomLevel={16} centerCoordinate={[0, 20]} />
        <VectorSource id="countrySource" url="mapbox://mapbox.country-boundaries-v1">
          <FillLayer
            id="country-fill"
            sourceLayerID="country_boundaries"
            style={{
              fillColor: [
                'case',
                ['in', ['get', 'iso_3166_1_alpha_3'], ['literal', countryStatus.visited]],
                '#0000FF',
                ['in', ['get', 'iso_3166_1_alpha_3'], ['literal', countryStatus.wishlist]],
                '#FFA500',
                '#CCCCCC',
              ],
              fillOpacity: [
                'case',
                ['in', ['get', 'iso_3166_1_alpha_3'], ['literal', countryStatus.visited]],
                0.5, // Fully opaque for visited countries
                ['in', ['get', 'iso_3166_1_alpha_3'], ['literal', countryStatus.wishlist]],
                0.5, // Slightly transparent for wishlist countries
                0, // Default opacity for all other countries
              ],
            }}
          />
        </VectorSource>
      </MapView>
      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints} enablePanDownToClose>
        <BottomSheetContent
          selectedCountry={selectedCountry}
          countryStatus={countryStatus}
          getCountryName={getCountryName}
          updateCountryStatus={updateCountryStatus}
        />
      </BottomSheet>
    </>
  );
};

export default Map;

const styles = StyleSheet.create({
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 16,
    flex: 1,
  },
  countryName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonText: {
    marginVertical: 8,
    fontSize: 16,
    color: '#007AFF',
  },
  disabledText: {
    color: 'gray',
  },
});
