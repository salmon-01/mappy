import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import countries from '~/assets/countries.json';
import { getUserData } from '~/services/authService';
import { getVisitedCountry, getWantToVisitCountries } from '~/services/apiService';

import UserProfile from '~/components/UserProfile';
import Stats from '~/components/Stats';
import CountryBottomSheet from '~/components/CountryBottomSheet';
import SettingsBottomSheet from '~/components/SettingsBottomSheet';

import avatar from '~/assets/avatars/avatar1.png';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Dashboard = () => {
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);
  const [wishlistCountries, setWishlistCountries] = useState<string[]>([]);
  const [showVisited, setShowVisited] = useState(true);

  const [isSettingsVisible, setSettingsVisible] = useState(false);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const userData = await getUserData();
        if (userData && userData.id) {
          const visitedResponse = await getVisitedCountry(userData.id);
          const wishlistResponse = await getWantToVisitCountries(userData.id);
          setVisitedCountries(visitedResponse.map((country: any) => country.country_code));
          setWishlistCountries(wishlistResponse.map((country: any) => country.country_code));
        }
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountryData();
  }, []);

  // DB country_code to countries.json country details
  const getCountryDetails = (isoCode: string) => {
    return countries.find((c) => c.iso_3166_1_alpha_3 === isoCode);
  };

  const totalVisitedCountries = visitedCountries.length;
  const percentageOfWorldVisited = ((totalVisitedCountries / 195) * 100).toFixed(0);
  const regionsVisited = new Set(visitedCountries.map((c) => getCountryDetails(c)?.continent)).size;

  const totalWishlistCountries = wishlistCountries.length;
  const favoriteRegion =
    Object.entries(
      wishlistCountries.reduce(
        (acc, code) => {
          const country = getCountryDetails(code);
          const { continent } = country || {};
          if (continent) acc[continent] = (acc[continent] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      )
    ).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown Region'; // region with the most "want to visit" countries

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <UserProfile username="salmon-01" avatar={avatar} onPress={() => setSettingsVisible(true)} />
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
          onLogout={() => console.log('Logout pressed')}
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
    backgroundColor: '#fff',
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});

export default Dashboard;
