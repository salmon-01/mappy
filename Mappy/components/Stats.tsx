import React from 'react'
import { Text, View, StyleSheet } from 'react-native';

interface StatsProps {
  totalVisited: number;
  percentageOfWorld?: string;
  regionsVisited?: number;
  totalRegions?: number;
  favoriteRegion?: string; // Only used for "Want to Visit"
}

const Stats: React.FC<StatsProps> = ({ totalVisited, percentageOfWorld, regionsVisited, totalRegions, favoriteRegion }) => {
  return (
    <View style={styles.statsContainer}>
      {favoriteRegion ? (
        <>
          <Text style={styles.statText}>{totalVisited} countries</Text>
          <Text style={styles.statText}>{favoriteRegion} favourite region</Text>
        </>
      ) : (
        <>
          <Text style={styles.statText}>{totalVisited}/195 countries</Text>
          <Text style={styles.statText}>{percentageOfWorld}% of the world</Text>
          <Text style={styles.statText}>{regionsVisited}/{totalRegions} regions</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default Stats