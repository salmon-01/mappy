import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoginButton from '../../components/LoginButton';
import { useRouter } from 'expo-router';

const LoginScreen: React.FC = () => {
  const router = useRouter();

  const handleLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
    router.replace('/auth/welcome');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <LoginButton provider="Apple" onPress={() => handleLogin('Apple')} />
      <LoginButton provider="Google" onPress={() => handleLogin('Google')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LoginScreen;
