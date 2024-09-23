import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Dimensions } from 'react-native';

interface CountryToggleProps {
  showVisited: boolean;
  onToggle: (value: boolean) => void;
}

const CountryToggle: React.FC<CountryToggleProps> = ({ showVisited, onToggle }) => {
  const screenWidth = Dimensions.get('window').width;

  const slideAnimation = useRef(new Animated.Value(showVisited ? 0 : 1)).current;

  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: showVisited ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showVisited]);

  const buttonWidth = (screenWidth - 40) / 2;

  const translateX = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, buttonWidth],
  });

  return (
    <View style={[styles.toggleSection, { width: screenWidth - 40 }]}>
      <View style={[styles.toggleBackground, { width: screenWidth - 40 }]}>
        <Animated.View
          style={[styles.toggleSlider, { transform: [{ translateX }], width: buttonWidth }]}
        />
        <TouchableOpacity style={styles.toggleButton} onPress={() => onToggle(true)}>
          <Text
            style={[
              styles.toggleText,
              showVisited ? styles.visitedActiveText : styles.inactiveText,
            ]}>
            Visited
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={() => onToggle(false)}>
          <Text
            style={[
              styles.toggleText,
              !showVisited ? styles.wantToVisitActiveText : styles.inactiveText,
            ]}>
            Want to Visit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleBackground: {
    flexDirection: 'row',
    position: 'relative',
    height: 56,
    borderRadius: 12,
    backgroundColor: '#EAEAEA',
    overflow: 'hidden',
  },
  toggleSlider: {
    position: 'absolute',
    height: '100%',
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#EAEAEA',
  },
  toggleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  visitedActiveText: {
    color: '#5438DC',
  },
  wantToVisitActiveText: {
    color: '#7CFFC4',
  },
  inactiveText: {
    color: '#858585',
  },
});

export default CountryToggle;
