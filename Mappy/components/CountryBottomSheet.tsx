import React, { useRef, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import CountryToggle from './CountryToggle';
import CountryList from './CountryList';

interface CountryBottomSheetProps {
  showVisited: boolean;
  onToggle: (value: boolean) => void;
  visitedCountries: string[];
  wishlistCountries: string[];
  getCountryDetails: (isoCode: string) => { name: string; continent: string } | undefined;
}

const CountryBottomSheet: React.FC<CountryBottomSheetProps> = ({
  showVisited,
  onToggle,
  visitedCountries,
  wishlistCountries,
  getCountryDetails,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['50%', '75%', '90%'], []); 

  return (
    <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints} enablePanDownToClose={false}>
      <View style={styles.bottomSheetContent}>
        <CountryToggle showVisited={showVisited} onToggle={onToggle} />
        <CountryList
          countries={showVisited ? visitedCountries : wishlistCountries}
          getCountryDetails={getCountryDetails}
          showVisited={showVisited}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});

export default CountryBottomSheet;
