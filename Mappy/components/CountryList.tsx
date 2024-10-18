import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import countries from '~/assets/countries.json';
import { CountryListProps } from '~/types';

const regionColors: Record<string, string> = {
  Oceania: '#75C9DC',
  'South America': '#9AD75C',
  'North America': '#053D90',
  Europe: '#F73AD8',
  Asia: '#D7AD5C',
  Antarctica: '#00BCD4',
  Africa: '#981B1B',
};

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
  getCountryDetails: (
    isoCode: string
  ) => { name: string; continent: string } | undefined
) => {
  return countries.reduce(
    (acc, code) => {
      const country = getCountryDetails(code);
      if (!country) return acc;
      const { continent } = country;
      if (!acc[continent]) {
        acc[continent] = { countries: [], count: 0 };
      }
      acc[continent].countries.push(country);
      acc[continent].count += 1;
      return acc;
    },
    {} as Record<string, { countries: { name: string; }[]; count: number }>
  );
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

          <View style={styles.regionHeaderContainer}>
            <View style={[styles.regionBadge, { backgroundColor: regionColors[continent] }]}>
              <Text style={styles.regionText}>{continent}</Text>
            </View>

            <Text style={styles.countryCount}>
              {showVisited ? `${count}/${totalCountriesByContinent[continent]}` : `${count}`}
            </Text>
          </View>

          <View style={styles.separator} />

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
  regionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  regionBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  regionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  countryCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 10,
  },
  countryRow: {
    paddingVertical: 5,
  },
  countryName: {
    fontSize: 17,
    color: '#333333',
    fontWeight: '500',
  },
});

export default CountryList;
