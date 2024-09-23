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
  const { selectedCountry } = useContext(CountryContext);

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

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
          height: 60,
          paddingBottom: 0,
          marginBottom: 0,
          display: selectedCountry ? 'none' : 'flex',
        },
      })}>
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
