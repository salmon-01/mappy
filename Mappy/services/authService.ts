import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_LOGGED_IN_KEY = 'userLoggedIn';
const USER_DATA_KEY = 'userData';

export const loginUser = async () => {
  try {
    console.log('Starting login process...');

    await AsyncStorage.setItem(USER_LOGGED_IN_KEY, 'true');
    console.log('USER_LOGGED_IN_KEY set to true');

    // Mock user data
    const userData = {
      id: '0e494424-da07-4312-863b-ef833fd83a51',
      username: 'mockUser',
      displayName: 'Mock User',
      avatar: 'avatar1',
    };

    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    console.log('USER_DATA_KEY set to:', userData);

    const storedData = await AsyncStorage.getItem(USER_DATA_KEY);
    console.log('Stored userData after login:', storedData);
  } catch (error) {
    console.error('Error logging in user', error);
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_LOGGED_IN_KEY);
    await AsyncStorage.removeItem(USER_DATA_KEY);
  } catch (error) {
    console.error('Error logging out user', error);
  }
};

export const isUserLoggedIn = async () => {
  try {
    const loggedIn = await AsyncStorage.getItem(USER_LOGGED_IN_KEY);
    return loggedIn === 'true';
  } catch (error) {
    console.error('Error logging in user', error);
    return false;
  }
};

export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data', error);
    return null;
  }
};

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error('Error clearing AsyncStorage:', e);
  }
};
