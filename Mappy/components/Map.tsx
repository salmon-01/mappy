import Mapbox, { Camera, MapView, LocationPuck } from '@rnmapbox/maps';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

export default function Map() {
  return (
    <MapView style={{ flex: 1 }} styleURL='mapbox://styles/ilyaono/cm17nfsaa026w01o37wziemoa'>
      <Camera followZoomLevel={8} followUserLocation/>
      <LocationPuck pulsing={{isEnabled: true}}/>
    </MapView>
  );
}
