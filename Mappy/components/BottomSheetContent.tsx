import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface BottomSheetContentProps {
  selectedCountry: any;
  visitedCountries: string[];
  wantToVisitCountries: string[];
  getCountryName: (isoCode: string) => string;
  updateCountryStatus: (isoCode: string, listType: 'visited' | 'wishlist') => void;
}

const BottomSheetContent: React.FC<BottomSheetContentProps> = ({
  selectedCountry,
  visitedCountries,
  wantToVisitCountries,
  getCountryName,
  updateCountryStatus,
}) => {
  if (!selectedCountry) return <Text>Select a country</Text>;

  const isoCode = selectedCountry.properties.iso_3166_1_alpha_3;

  // Check if the country is in visited or want to visit
  const isVisited = visitedCountries.includes(isoCode);
  const isWishlist = wantToVisitCountries.includes(isoCode);

  return (
    <View style={styles.bottomSheetContent}>
      <Text style={styles.countryName}>{getCountryName(isoCode)}</Text>

      {/* Button to add/remove from visited */}
      <TouchableOpacity
        onPress={() => updateCountryStatus(isoCode, 'visited')}
        disabled={isWishlist}>
        <Text style={[styles.buttonText, isVisited && styles.disabledText]}>
          {isVisited ? 'Remove from Visited' : 'Add to Visited'}
        </Text>
      </TouchableOpacity>

      {/* Button to add/remove from wishlist */}
      <TouchableOpacity
        onPress={() => updateCountryStatus(isoCode, 'wishlist')}
        disabled={isVisited}>
        <Text style={[styles.buttonText, isWishlist && styles.disabledText]}>
          {isWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </Text>
      </TouchableOpacity>
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

export default BottomSheetContent;
