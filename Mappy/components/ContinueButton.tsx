import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ContinueButtonProps {
  onPress: () => void;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Continue</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFCD83',
    padding: 16,
    borderRadius: 25,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#333333',
    fontWeight: 700,
    fontSize: 16,
  },
});

export default ContinueButton;
