import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { CountryProvider, CountryContext } from '~/context/CountryContext';

export default function Layout() {
  return (
    <CountryProvider>
      <TabsWithConditionalTabBar />
    </CountryProvider>
  );
}

function TabsWithConditionalTabBar() {
  const context = useContext(CountryContext);

  if (!context) {
    throw new Error('CountryContext must be used within a CountryProvider');
  }

  const { selectedCountry } = context;

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap | undefined;

          if (route.name === 'home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'information') {
            iconName = focused ? 'planet' : 'planet-outline';
          } else if (route.name === 'dashboard') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 75,
          paddingBottom: 20,
          marginBottom: 0,
          display: selectedCountry ? 'none' : 'flex',
        },
        headerShown: false,
        safeAreaInsets: { top: 0, bottom: 0 },
      })}>
      {/* <Tabs.Screen name="explore" options={{ title: 'Explore' }} /> */}
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="dashboard" options={{ title: 'Dashboard' }} />
    </Tabs>
  );
}