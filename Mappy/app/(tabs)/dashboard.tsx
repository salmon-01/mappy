import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import countries from '~/assets/countries.json';
import { CountryContext } from '~/context/CountryContext';
import UserProfile from '~/components/UserProfile';
import Stats from '~/components/Stats';
import CountryBottomSheet from '~/components/CountryBottomSheet';
import SettingsBottomSheet from '~/components/SettingsBottomSheet';

import avatar from '~/assets/avatars/avatar1.png';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

const Dashboard = () => {
  const router = useRouter();
  const { visitedCountries, wishlistCountries } = useContext(CountryContext)!;
  const [showVisited, setShowVisited] = useState(true);
  const [isSettingsVisible, setSettingsVisible] = useState(false);

  // DB country_code to countries.json country details
  const getCountryDetails = (isoCode: string): { name: string; continent: string } | undefined => {
    const country = countries.find(
      (c: { iso_3166_1_alpha_3: string }) => c.iso_3166_1_alpha_3 === isoCode
    );
    return country ? { name: country.name, continent: country.continent || 'Unknown' } : undefined;
  };

  const totalVisitedCountries = visitedCountries.length;
  const percentageOfWorldVisited = ((totalVisitedCountries / 195) * 100).toFixed(0);
  const regionsVisited = new Set(visitedCountries.map((c) => getCountryDetails(c)?.continent)).size;

  const totalWishlistCountries = wishlistCountries.length;
  const favoriteRegion = Object.entries(
    wishlistCountries.reduce(
      (acc, code) => {
        const country = getCountryDetails(code);
        const { continent } = country || {};
        if (continent) acc[continent] = (acc[continent] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    )
  ).sort((a, b) => b[1] - a[1])[0]?.[0]; // region with the most "want to visit" countries

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <UserProfile
          username="Test User 1"
          avatar={avatar}
          onPress={() => setSettingsVisible(true)}
        />
        {showVisited ? (
          <Stats
            totalVisited={totalVisitedCountries}
            percentageOfWorld={percentageOfWorldVisited}
            regionsVisited={regionsVisited}
            totalRegions={7}
          />
        ) : (
          <Stats totalVisited={totalWishlistCountries} favoriteRegion={favoriteRegion} />
        )}
        <CountryBottomSheet
          showVisited={showVisited}
          onToggle={setShowVisited}
          visitedCountries={visitedCountries}
          wishlistCountries={wishlistCountries}
          getCountryDetails={getCountryDetails}
        />

        <SettingsBottomSheet
          isVisible={isSettingsVisible}
          onClose={() => setSettingsVisible(false)}
          onClearMap={() => console.log('Clear map pressed')}
          onLogout={() => router.push('/auth/login')}
          onDeleteAccount={() => console.log('Delete account pressed')}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#5EBDE5',
  },
});

export default Dashboard;
