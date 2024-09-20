import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { isUserLoggedIn } from '~/services/authService';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {

    const checkLoginStatus = async () => {
      const loggedIn = await isUserLoggedIn();
      
      if (loggedIn) {
        router.push('/home'); // Redirect to home if logged in
      } else {
        router.push('/auth/login'); // Redirect to login if not logged in
      }
    };

    checkLoginStatus();
  }, [router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mappy</Text>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
