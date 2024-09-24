import React, { useRef, useMemo } from 'react';
import MapboxGL from '@rnmapbox/maps';
import { MapView, Camera, VectorSource, FillLayer } from '@rnmapbox/maps';
import BottomSheet from '@gorhom/bottom-sheet';
import countries from '../assets/countries.json';
import BottomSheetContent from './BottomSheetContent';
import { useCountryContext } from '~/context/CountryContext';

MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

interface GeoJsonFeature {
  type: 'Feature';
  properties: {
    iso_3166_1_alpha_3: string;
    [key: string]: any;
  };
  geometry: {
    type: string;
    coordinates: number[] | number[][] | number[][][];
  };
}

interface MapProps {
  visitedCountries: string[];
  wishlistCountries: string[];
  updateCountryStatus: (isoCode: string, listType: 'visited' | 'wishlist') => Promise<void>;
}

const Map: React.FC<MapProps> = ({ visitedCountries, wishlistCountries, updateCountryStatus }) => {
  const { setSelectedCountry, selectedCountry } = useCountryContext();
  const mapRef = useRef<MapboxGL.MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['26%'], []);

  const handleCountrySelection = async (event: any) => {
    const { properties } = event;
    if (!properties || !mapRef.current) return;

    const { screenPointX, screenPointY } = properties;
    const features = await mapRef.current.queryRenderedFeaturesAtPoint(
      [screenPointX, screenPointY],
      undefined,
      ['country-fill']
    );

    if (features?.features?.length) {
      const feature = features.features[0] as GeoJsonFeature;
      setSelectedCountry(feature);
      bottomSheetRef.current?.expand();
    }
  };

  const getCountryName = (isoCode: string) => {
    const country = countries.find((c) => c.iso_3166_1_alpha_3 === isoCode);
    return country?.name || 'Unknown Country';
  };

  const handleCloseBottomSheet = () => {
    setSelectedCountry(null);
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        styleURL="mapbox://styles/ilyaono/cm1e2ygtf02gg01pidqrc5gxt"
        rotateEnabled={false}
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
                '#5438DC',
                ['in', ['get', 'iso_3166_1_alpha_3'], ['literal', wishlistCountries]],
                '#7CFFC4',
                '#CCCCCC',
              ],
              fillOpacity: [
                'case',
                ['in', ['get', 'iso_3166_1_alpha_3'], ['literal', visitedCountries]],
                0.7,
                ['in', ['get', 'iso_3166_1_alpha_3'], ['literal', wishlistCountries]],
                0.7,
                0,
              ],
            }}
          />
        </VectorSource>
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={handleCloseBottomSheet}>
        <BottomSheetContent
          selectedCountry={selectedCountry}
          visitedCountries={visitedCountries}
          wishlistCountries={wishlistCountries}
          getCountryName={getCountryName}
          updateCountryStatus={updateCountryStatus}
        />
      </BottomSheet>
    </>
  );
};

export default Map;
