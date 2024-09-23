import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Map from '~/components/Map';
import { useCountryContext } from '~/context/CountryContext';
import { getUserData } from '~/services/authService';
import {
  addVisitedCountry,
  addWantToVisitCountry,
  getVisitedCountry,
  getWantToVisitCountries,
  removeVisitedCountry,
  removeWantToVisitCountry,
} from '~/services/apiService';

export default function Home() {
  const { visitedCountries, wishlistCountries, setVisitedCountries, setWishlistCountries } =
    useCountryContext();

  const updateCountryStatus = async (isoCode: string, listType: 'visited' | 'wishlist') => {
    const userData = await getUserData();
    if (!userData || !userData.id) return;

    const userId = userData.id;

    try {
      console.log('Updating status for:', isoCode, 'List type:', listType);
      console.log('Before update:', visitedCountries, wishlistCountries);
      if (listType === 'visited') {
        if (visitedCountries.includes(isoCode)) {
          await removeVisitedCountry(userId, isoCode); // Remove from visited in backend
          setVisitedCountries((prev) => prev.filter((code) => code !== isoCode)); // Remove from local state
        } else {
          await addVisitedCountry(userId, isoCode); // Add to visited in backend
          setVisitedCountries((prev) => [...prev, isoCode]); // Add to local state
        }
      } else if (listType === 'wishlist') {
        if (wishlistCountries.includes(isoCode)) {
          await removeWantToVisitCountry(userId, isoCode); // Remove from wishlist in backend
          setWishlistCountries((prev) => prev.filter((code) => code !== isoCode)); // Remove from local state
        } else {
          await addWantToVisitCountry(userId, isoCode); // Add to wishlist in backend
          setWishlistCountries((prev) => [...prev, isoCode]); // Add to local state
        }
      }
    } catch (error) {
      console.error('Error updating country status:', error);
    }
  };

  useEffect(() => {
    const fetchCountryData = async () => {
      const userData = await getUserData();
      if (!userData || !userData.id) return;

      const userId = userData.id;

      try {
        const visitedResponse = await getVisitedCountry(userId);
        const wishlistResponse = await getWantToVisitCountries(userId);

        setVisitedCountries(visitedResponse.map((country: any) => country.country_code));
        setWishlistCountries(wishlistResponse.map((country: any) => country.country_code));
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountryData();
  }, [setVisitedCountries, setWishlistCountries]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Map
        visitedCountries={visitedCountries}
        wishlistCountries={wishlistCountries}
        updateCountryStatus={updateCountryStatus}
      />
    </GestureHandlerRootView>
  );
}
