import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AvatarPicker from '~/components/AvatarPicker';
import UserInputForm from '~/components/UserInputForm';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = () => {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [avatar, setAvatar] = useState('');
  const router = useRouter();

  const handleContinue = async () => {
    if (username && displayName && avatar) {
      const mockUserId = '0e494424-da07-4312-863b-ef833fd83a51';
      const userData = {
        id: mockUserId,
        username,
        displayName,
        avatar,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      router.push('/home');
    } else {
      alert('Please complete all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <UserInputForm
        username={username}
        setUsername={setUsername}
        displayName={displayName}
        setDisplayName={setDisplayName}
      />
      <AvatarPicker selectedAvatar={avatar} setAvatar={setAvatar} />
      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
