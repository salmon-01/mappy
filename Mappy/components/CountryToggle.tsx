import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CountryToggleProps {
  showVisited: boolean;
  onToggle: (value: boolean) => void;
}

const CountryToggle: React.FC<CountryToggleProps> = ({ showVisited, onToggle }) => {
  return (
    <View style={styles.toggleSection}>
      <TouchableOpacity
        style={[styles.toggleButton, showVisited && styles.activeToggleButton]}
        onPress={() => onToggle(true)}
      >
        <Text style={styles.toggleText}>Visited</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggleButton, !showVisited && styles.activeToggleButton]}
        onPress={() => onToggle(false)}
      >
        <Text style={styles.toggleText}>Want to visit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleButton: {
    padding: 10,
    marginHorizontal: 10,
  },
  activeToggleButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  toggleText: {
    fontSize: 16,
  },
});

export default CountryToggle;
