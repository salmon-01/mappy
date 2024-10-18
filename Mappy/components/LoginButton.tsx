import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LoginButtonProps } from '~/types';

const LoginButton: React.FC<LoginButtonProps> = ({ provider, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Login with {provider}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E8F1F9',
    padding: 16,
    borderRadius: 25,
    marginVertical: 10,
    width: '85%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#333333',
    fontWeight: 700,
    fontSize: 16,
  },
});

export default LoginButton;
