import AsyncStorage from '@react-native-async-storage/async-storage';

export const setUserInformation = async (userInfo: any) => {
  try {
    await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
  } catch (error) {
    console.log('Error setting user information:', error);
  }
};

export const getUserInformation = async (): Promise<any | null> => {
  try {
    const userInfoString = await AsyncStorage.getItem('userInfo');
    if (userInfoString) {
      return JSON.parse(userInfoString);
    }
    return null;
  } catch (error) {
    console.log('Error getting user information:', error);
    return null;
  }
};
export const setIntroSlider = async (sliderData: any) => {
  try {
    await AsyncStorage.setItem('introSlider', JSON.stringify(sliderData));
  } catch (error) {
    console.log('Error setting intro slider:', error);
  }
};
export const getIntroSlider = async (): Promise<any | null> => {
  try {
    const sliderDataString = await AsyncStorage.getItem('introSlider');
    if (sliderDataString) {
      return JSON.parse(sliderDataString);
    }
    return null;
  } catch (error) {
    console.log('Error getting intro slider:', error);
    return null;
  }
};
export const clearUserInfo = async () => {
  try {
    await AsyncStorage.removeItem('userInfo');
    console.log('User information cleared.');
  } catch (error) {
    console.log('Error clearing user information:', error);
  }
};

export const clearIntroSlider = async () => {
  try {
    await AsyncStorage.removeItem('introSlider');
    console.log('Intro slider cleared.');
  } catch (error) {
    console.log('Error clearing intro slider:', error);
  }
};
