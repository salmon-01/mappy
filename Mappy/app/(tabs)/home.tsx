import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Map from '~/components/Map';

export default function Home() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Map />
    </GestureHandlerRootView>
  );
}
