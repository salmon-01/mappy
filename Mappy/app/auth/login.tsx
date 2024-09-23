import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LoginButton from '../../components/LoginButton';
import { useRouter } from 'expo-router';
import { loginUser } from '~/services/authService';
import image from '~/assets/loginImg.png';

const LoginScreen = () => {
  const router = useRouter();

  const handleLogin = async (provider: string) => {
    console.log(`Logging in with ${provider}`);
    await loginUser();
    router.replace('/auth/welcome');
  };

  return (
    <View style={styles.container}>
      <Image source={image} />
      <Text style={styles.title}>Let's get started</Text>
      <View style={styles.textContainer}>
        <Text style={styles.description}>Sign in to start scratching the map.</Text>
        <Text style={styles.description}>The world awaits you.</Text>
      </View>
      <LoginButton provider="Apple" onPress={() => handleLogin('Apple')} />
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.separator} />
      </View>
      <LoginButton provider="Google" onPress={() => handleLogin('Google')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#5EBDE5',
    marginBottom: -35,
    paddingBottom: 112,
    marginTop: -60,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#212121',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    width: '80%',
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ffffff',
  },
  orText: {
    marginHorizontal: 16,
    color: '#ffffff',
    fontSize: 16,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  description: {
    fontSize: 17,
    color: '#ffffff',
    fontWeight: '500',
  },
});

export default LoginScreen;
