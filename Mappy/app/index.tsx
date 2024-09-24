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
        router.push('/home'); 
      } else {
        router.push('/auth/login'); 
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
