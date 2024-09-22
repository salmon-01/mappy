import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import countries from '~/assets/countries.json'; 


interface CountryListProps {
  countries: string[];
  getCountryDetails: (isoCode: string) => { name: string; flag: string; continent: string } | undefined;
  showVisited: boolean; 
}

// get total countries by continent from countries.json
const getTotalCountriesByContinent = () => {
  const continentCounts: Record<string, number> = {};

  countries.forEach((country) => {
    const { continent } = country;
    if (continent) {
      if (!continentCounts[continent]) {
        continentCounts[continent] = 0;
      }
      continentCounts[continent]++;
    }
  });

  return continentCounts;
};

// group countries by continent and calculate visited or want-to-visit counts
const groupCountriesByContinent = (
  countries: string[],
  getCountryDetails: (isoCode: string) => { name: string; flag: string; continent: string } | undefined
) => {
  return countries.reduce((acc, code) => {
    const country = getCountryDetails(code);
    if (!country) return acc;
    const { continent } = country;
    if (!acc[continent]) {
      acc[continent] = { countries: [], count: 0 };
    }
    acc[continent].countries.push(country);
    acc[continent].count += 1; 
    return acc;
  }, {} as Record<string, { countries: { name: string; flag: string }[]; count: number }>);
};

const CountryList: React.FC<CountryListProps> = ({ countries, getCountryDetails, showVisited }) => {
  const groupedCountries = groupCountriesByContinent(countries, getCountryDetails);
  const totalCountriesByContinent = getTotalCountriesByContinent();

  return (
    <FlatList
      data={Object.entries(groupedCountries)}
      keyExtractor={([continent]) => continent}
      renderItem={({ item: [continent, { countries: countryList, count }] }) => (
        <View style={styles.continentSection}>
          <Text style={styles.continentHeader}>
            {continent} {showVisited ? `${count}/${totalCountriesByContinent[continent]}` : `${count}`}
          </Text>
          {countryList.map((country, index) => (
            <View key={index} style={styles.countryRow}>
              <Text style={styles.countryName}>{country.name}</Text>
            </View>
          ))}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  continentSection: {
    marginBottom: 20,
  },
  continentHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  countryName: {
    fontSize: 16,
  },
});


export default CountryList;
