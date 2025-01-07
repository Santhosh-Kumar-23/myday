import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {moderateScale} from 'react-native-size-matters';
import * as Images from '../constants/images';
import * as Strings from '../constants/string';
import {COLORS, Fonts} from '../constants/theme';
import {isIos} from './functions';

export const checkBiometricIsAvailable = async () => {
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });
  const result = await rnBiometrics.isSensorAvailable();
  if (result.available) {
    return true;
  } else {
    return false;
  }
};

export const checkAndEnableBiometrics = async () => {
  try {
    const rnBiometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true,
    });
    const result = await rnBiometrics.isSensorAvailable();
    console.log('biometric Result', result);
    if (result.available) {
      const biometryType = result.biometryType;
      let promptMessage = '';
      let successMessage = '';
      if (biometryType === BiometryTypes.TouchID) {
        promptMessage = 'Would you like to enable TouchID authentication?';
        successMessage = 'TouchID authentication enabled successfully!';
      } else if (biometryType === BiometryTypes.FaceID) {
        promptMessage = 'Would you like to enable FaceID authentication?';
        successMessage = 'FaceID authentication enabled successfully!';
      } else if (biometryType === BiometryTypes.Biometrics) {
        promptMessage = 'Would you like to enable Biometric authentication?';
        successMessage = 'Biometric authentication enabled successfully!';
      }

      return new Promise(async(resolve, reject) => {
       
                await AsyncStorage.setItem('biometricsEnabled', 'true');
                checkBiometricsOnAppOpen();
                resolve(true); // Resolve with true if biometrics enabled
    })
    } else {
      Alert.alert(
        'Biometrics not supported',
        'This device does not support biometric authentication.',
      );
      return false; // Return false if biometrics not available
    }
  } catch (error) {
    console.error('Error:', error);
    Alert.alert(
      'Error',
      'An error occurred while checking biometrics availability.',
    );
    return false; // Return false if an error occurs
  }
};

export const checkBiometricsOnAppOpen = async (
  setModalVisible = (p0: boolean) => {},
  setIsAuthenticated = (p0: boolean) => {},
) => {
  try {
    const biometricsEnabled = await AsyncStorage.getItem('biometricsEnabled');

    if (biometricsEnabled === 'true') {
      const rnBiometrics = new ReactNativeBiometrics({
        allowDeviceCredentials: true,
      });

      const {success} = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate to continue',
      });

      if (success) {
        setModalVisible(false); // Optional: Call the provided function to update modal visibility
        setIsAuthenticated(true); // Optional: Call the provided function to update authentication status
        return true;
      } else {
        setModalVisible(true); // Optional: Call the provided function to update modal visibility
        return false;
      }
    } else {
      return false; // Biometrics not enabled
    }
  } catch (error) {
    console.error('[checkBiometricsOnAppOpen] Error:', error);
    Alert.alert('Error', 'Biometric authentication failed from device');
    return false;
  }
};

export const AuthenticationModal = ({visible, onRetry}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View style={styles.unlockContainer}>
            <Text style={styles.h1}>{Strings.UNLOCK_THE_APP}</Text>
          </View>
          <View style={styles.imageContainer}>
            <View style={styles.imagesubContainer}>
              <Image
                source={
                  !isIos ? Images.biometricsAndroid : Images.biometricsIos
                }
                resizeMode={Strings.COVER}
                style={styles.imageStyle}
              />
            </View>
          </View>
          <View style={styles.verification}>
            <Text style={styles.t1}>
              {!isIos
                ? Strings.ALLOW_BIO_METERICS_FOR_VERIFICATION
                : Strings.PLEASE_ALLOW_YOUR_FACE_ID_FOR_VERIFICATION}
            </Text>
            <Text style={styles.t1}>"{Strings.BIOMETRICS_ANDROID_HEADING}</Text>

            {!isIos ? (
              <Pressable style={styles.unlockNowContainer} onPress={onRetry}>
                <Text style={styles.unlockNow}>{Strings.UNLOCK_NOW}</Text>
              </Pressable>
            ) : (
              <Pressable style={{height: 60, width: 60}} onPress={onRetry}>
                <Image
                  tintColor={'#00B0FF'}
                  source={Images.faceId}
                  style={{height: '100%', width: '100%'}}
                  resizeMode={Strings.CONTAIN}
                />
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  unlockNowContainer: {
    backgroundColor: COLORS.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    padding: moderateScale(8),
    borderRadius: 10,
  },
  unlockNow: {
    color: COLORS.whiteColor,
    fontSize: 14,
    fontFamily: Fonts.Medium,
  },
  imageContainer: {
    flex: 0.55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verification: {
    flex: 0.35,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  imagesubContainer: {
    height: 250,
    width: 370,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  unlockContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.whiteColor,
    width: '100%',
    height: '100%',
  },
  t1: {
    fontFamily: Fonts.SemiBold,
    fontSize: 16,
    color: COLORS.blackColor,
    textAlign: 'center',
  },

  h1: {
    fontFamily: Fonts.ExtraBold,
    fontSize: 16,
    color: COLORS.blackColor,
    textAlign: 'center',

    // marginBottom: 150,
  },
  heading: {
    fontFamily: Fonts.Bold,
    fontSize: 25,
    color: COLORS.secondaryColor,
  },
});
