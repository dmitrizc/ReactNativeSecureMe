import AsyncStorage from '@react-native-community/async-storage';

export const storeToken = token => {
  return AsyncStorage.setItem('@storage_token', token);
};

export const getToken = () => {
  return AsyncStorage.getItem('@storage_token');
};

export const clearToken = () => {
  return AsyncStorage.removeItem('@storage_token');
};

export const storeProfile = profile => {
  return AsyncStorage.setItem('@storage_profile', JSON.stringify(profile));
};

export const getProfile = async () => {
  try {
    const profileStr = await AsyncStorage.getItem('@storage_profile');
    return JSON.parse(profileStr);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const clearProfile = () => {
  return AsyncStorage.removeItem('@storage_profile');
};
