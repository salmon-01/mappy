import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { StatsProps } from '~/types';

const Stats: React.FC<StatsProps> = ({
  totalVisited,
  percentageOfWorld,
  regionsVisited,
  totalRegions,
  favoriteRegion,
}) => {
  return (
    <View style={styles.statsContainer}>
      {favoriteRegion ? (
        <View style={styles.statGroupContainer}>
          <View style={styles.statGroup}>
            <Text style={styles.largeStatText}>{totalVisited}</Text>
            <Text style={styles.smallStatText}>countries</Text>
          </View>
          <View style={styles.statGroup}>
            <Text style={styles.largeStatText}>{favoriteRegion}</Text>
            <Text style={styles.smallStatText}>favourite region</Text>
          </View>
        </View>
      ) : (
        <View style={styles.statGroupContainer}>
          <View style={styles.statGroup}>
            <Text style={styles.largeStatText}>{totalVisited}/195</Text>
            <Text style={styles.smallStatText}>countries</Text>
          </View>
          <View style={styles.statGroup}>
            <Text style={styles.largeStatText}>{percentageOfWorld}%</Text>
            <Text style={styles.smallStatText}>of the world</Text>
          </View>
          <View style={styles.statGroup}>
            <Text style={styles.largeStatText}>
              {regionsVisited}/{totalRegions}
            </Text>
            <Text style={styles.smallStatText}>regions visited</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  statGroupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statGroup: {
    alignItems: 'center',
  },
  largeStatText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  smallStatText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Stats;
