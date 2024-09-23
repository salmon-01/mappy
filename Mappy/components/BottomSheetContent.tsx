import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

interface BottomSheetContentProps {
  selectedCountry: GeoJsonFeature | null;
  visitedCountries: string[];
  wishlistCountries: string[];
  getCountryName: (isoCode: string) => string;
  updateCountryStatus: (isoCode: string, listType: 'visited' | 'wishlist') => void;
}

const BottomSheetContent: React.FC<BottomSheetContentProps> = ({
  selectedCountry,
  visitedCountries = [],
  wishlistCountries = [],
  getCountryName,
  updateCountryStatus,
}) => {
  const visitedOpacity = useRef(new Animated.Value(1)).current;
  const wishlistOpacity = useRef(new Animated.Value(1)).current;

  const isoCode = selectedCountry?.properties.iso_3166_1_alpha_3 ?? null;
  const isVisited = isoCode && visitedCountries.includes(isoCode);
  const isWishlist = isoCode && wishlistCountries.includes(isoCode);

  useEffect(() => {
    if (isoCode) {
      Animated.timing(visitedOpacity, {
        toValue: isWishlist ? 0 : 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      Animated.timing(wishlistOpacity, {
        toValue: isVisited ? 0 : 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisited, isWishlist, isoCode]);

  const handleVisitedPress = () => {
    updateCountryStatus(isoCode as string, 'visited');
  };

  const handleWishlistPress = () => {
    updateCountryStatus(isoCode as string, 'wishlist');
  };

  if (!selectedCountry) {
    return;
  }

  return (
    <View style={styles.bottomSheetContent}>
      <Text style={styles.countryName}>{getCountryName(isoCode as string)}</Text>

      <Animated.View style={{ opacity: visitedOpacity }}>
        <TouchableOpacity
          style={[styles.button, isVisited && styles.visitedButton]}
          onPress={handleVisitedPress}
          disabled={isWishlist}>
          <Text style={[styles.buttonText, isVisited && styles.visitedButtonText]}>Visited</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ opacity: wishlistOpacity }}>
        <TouchableOpacity
          style={[styles.button, isWishlist && styles.wishlistButton]}
          onPress={handleWishlistPress}
          disabled={isVisited}>
          <Text style={[styles.buttonText, isWishlist && styles.wishlistButtonText]}>
            Want to visit
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 16,
    flex: 1,
  },
  countryName: {
    fontSize: 24,
    color: '#212121',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visitedButton: {
    backgroundColor: '#5438DC',
  },
  visitedButtonText: {
    color: 'white',
  },
  wishlistButton: {
    backgroundColor: '#7CFFC4',
  },
  wishlistButtonText: {
    color: '#212121',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#858585',
  },
});

export default BottomSheetContent;
