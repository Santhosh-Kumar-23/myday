import {useMutation, useQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {PERMISSIONS, RESULTS, check} from 'react-native-permissions';
import PushNotification from 'react-native-push-notification';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import * as mutation from '../../api/mutation';
import * as mutations from '../../api/mutation';
import * as query from '../../api/query';
import {AdminHeader} from '../../components/adminComponents';
import LogoutModal from '../../components/modal/logoutModal';
import {AdminSettingsLoader} from '../../components/skeletonLoader/adminSettingsLoader';
import {ModalErrorType} from '../../constants/enums';
import * as Icons from '../../constants/icons';
import * as Interfaces from '../../constants/interfaces';
import {getUserInformation} from '../../constants/localStorage';
import * as String from '../../constants/string';
import {COLORS} from '../../constants/theme';
import {AppContextType} from '../../constants/types';
import {AppContext} from '../../navigation/appContext/appContext';
import * as Actions from '../../redux/actions/actions';
import store from '../../redux/reducers/store';
import {commonStyles} from '../../styles';
import {Styles} from '../../styles/adminSettingsStyles';
import {
  checkAndEnableBiometrics,
  checkBiometricIsAvailable,
} from '../../utlis/bioMetrics';
import * as Functions from '../../utlis/functions';
import {isIos} from '../../utlis/functions';
import {requestNotificationPermission} from '../../utlis/pushNotification';
import {adminResetNavigationStack} from '../../utlis/resetNavigation';

const AdminSettings: React.FC<{}> = (props: any) => {
  //Props Variables
  const {navigation} = props;

  //states
  const [isPushNotification, setIsPushNotification] = useState<boolean>(false);
  const [isSmartLock, setIsSmartLock] = useState<boolean>(false);
  const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);
  const [checkAndroidVersions, setCheckAndroidVersion] =
    useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  const [logOutLoader, setLogOutLoader] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [biometricisAvailble, setbiometricisAvailable] = useState(false);
  const [isPushNotificationEnabled, setIsPushNotificationEnabled] =
    useState(null);
  const [email, setEmail] = useState<string>('');
  const {clearUserInfo} = useContext<AppContextType>(AppContext);
  const dispatch = useDispatch();

  const mobileUserData = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.mobileUserData,
  );

  const firstName = mobileUserData?.user?.firstName ?? '';
  const LastName = mobileUserData?.user?.lastName ?? '';
  const fullName = [firstName, LastName].join(' ');

  const profileImage = mobileUserData?.user?.profile ?? '';

  useEffect(() => {
    getUserInformation().then(res => {
      setEmail(res?.email);

      console.log('userInformation::::::::::::', res);
    });
  }, []);

  //apicalls
  const [onCallLogOut] = useMutation(mutations.logOut);
  const [notifyandBiomtericApiCall] = useMutation(
    mutation.Notification_biomterics,
  );
  const {data} = useQuery(query.getNotificationAndBioStatus, {
    variables: {
      deviceType: isIos ? 'ios' : 'android',
    },
  });
  console.log(data, 'notificationStatus');
  //Hooks
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  });

  useEffect(() => {
    setIsPushNotification(data?.getUserBioPointData?.notification);
  }, [data?.getUserBioPointData?.notification]);

  useEffect(() => {
    checkNotificationPermission();
  }, [isPushNotificationEnabled]);

  useEffect(() => {
    checkBiometricIsAvailable().then(res => {
      if (res) {
        setbiometricisAvailable(true);
      } else {
        setbiometricisAvailable(false);
      }
    });
  });

  useEffect(() => {
    bioMetric();
    checkAndroidVersion();
  }, []);

  const checkAndroidVersion = async () => {
    try {
      const checkingVersion = await Functions.checkAndroidVersion();
      setCheckAndroidVersion(checkingVersion);
      console.log(checkingVersion, 'checkingVersion');
    } catch (error) {
      console.log(error);
    }
  };

  //Functions
  const bioMetric = async () => {
    const enable = await AsyncStorage.getItem('biometricsEnabled');
    if (enable != null) {
      setIsSmartLock(true);
    } else {
      setIsSmartLock(false);
    }
  };

  const loginStatus = async () => {
    clearUserInfo();
    store.dispatch(Actions.clearReduxStates());
    adminResetNavigationStack(navigation);
    await AsyncStorage.removeItem('biometricsEnabled');
    PushNotification.cancelAllLocalNotifications();
    PushNotification.removeAllDeliveredNotifications();
  };

  const clickLogout = async () => {
    setLogOutLoader(true);
    const deviceId = await Functions.deviceId();
    onCallLogOut({variables: {deviceId: deviceId}})
      .then(res => {
        const {status, message} = res?.data?.mobileLogout;
        if (status) {
          setLogOutLoader(false);
          setIsLogoutModal(false);
          loginStatus();

          Functions.toastMessage(message);
          console.log(message);
        } else {
          setLogOutLoader(false);
          dispatch(
            Actions.errorMessage({
              errorMessage: 'Logout Failed',
              status: true,
              errorType: ModalErrorType.Error,
            }),
          );
        }
      })
      .catch(error => {
        console.error('Logout Error', error);
        setLogOutLoader(false);
        dispatch(
          Actions.errorMessage({
            errorMessage: error.message,
            status: true,
            errorType: ModalErrorType.Error,
          }),
        );
        Functions.toastMessage(error.message);
      });
  };

  const checkNotificationPermission = async () => {
    let permissionStatus;

    if (Platform.OS === 'android') {
      permissionStatus = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    }
    if (
      permissionStatus === RESULTS.GRANTED ||
      permissionStatus === RESULTS.LIMITED
    ) {
      setIsPushNotificationEnabled(true);
    } else {
      setIsPushNotificationEnabled(false);
    }
  };
  console.log(isPushNotificationEnabled, 'isPushNotificationEnabled');
  //UI Functions
  const renderEditProfile = (): React.JSX.Element => {
    const renderEditIcon = (): React.JSX.Element => {
      return (
        <View style={commonStyles.flex(0.1)}>
          <Image
            source={Icons.editProfile}
            tintColor={COLORS.secondaryColor}
            resizeMode={String.CONTAIN}
            style={Styles.iconStyle}
          />
        </View>
      );
    };

    const renderEdit = (): React.JSX.Element => {
      return (
        <View>
          <Text style={Styles.subHeading}>{String.EDIT_PROFILE}</Text>
        </View>
      );
    };

    const renderRightArrow = (): React.JSX.Element => {
      return (
        <Image
          tintColor={COLORS.secondaryColor}
          source={Icons.rightArrow}
          resizeMode={String.CONTAIN}
          style={Styles.iconStyle}
        />
      );
    };

    return (
      <Pressable
        style={Styles.settingsContainer}
        onPress={() => {
          navigation.navigate(String.ADMIN_EDIT_PROFILE);
        }}>
        {renderEditIcon()}
        <View style={Styles.mainContainer}>
          {renderEdit()}
          {renderRightArrow()}
        </View>
      </Pressable>
    );
  };

  const renderPushNotification = (): React.JSX.Element => {
    const renderPushNotificationIcon = (): React.JSX.Element => {
      return (
        <View style={commonStyles.flex(0.1)}>
          <Image
            source={Icons.pushNotication}
            resizeMode={String.CONTAIN}
            style={Styles.iconStyle}
            tintColor={COLORS.secondaryColor}
          />
        </View>
      );
    };

    const renderPushNotification = (): React.JSX.Element => {
      return (
        <View>
          <Text style={Styles.subHeading}>{String.PUSH_NOTIFICATION}</Text>
        </View>
      );
    };

    const renderRightArrow = (): React.JSX.Element => {
      return (
        <ToggleSwitch
          isOn={isPushNotificationEnabled}
          onColor={COLORS.secondaryColor}
          offColor={COLORS.darkGrey}
          size="small"
          onToggle={isOn => {
            if (isOn == true) {
              setIsPushNotification(true);
              requestNotificationPermission().then(res => {
                if (res) {
                  setIsPushNotificationEnabled(true);
                  notifyandBiomtericApiCall({
                    variables: {
                      input: {
                        notification: true,
                      },
                    },
                    onCompleted: response => {
                      if (response) {
                        console.log(response, 'notification');
                      }
                    },
                  });
                } else {
                  Linking.openSettings();
                }
              });
            } else {
              Linking.openSettings().then(response => {
                if (response) {
                  console.log('settingPage', response);
                  checkNotificationPermission();
                  notifyandBiomtericApiCall({
                    variables: {
                      input: {
                        notification: false,
                      },
                    },
                    onCompleted: response => {
                      if (response) {
                        console.log(response, 'notification');
                      }
                    },
                  });
                }
              });
            }
          }}
        />
      );
    };

    return (
      <View style={Styles.settingsContainer}>
        {renderPushNotificationIcon()}
        <View style={Styles.mainContainer}>
          {renderPushNotification()}
          {renderRightArrow()}
        </View>
      </View>
    );
  };

  const renderPassword = (): React.JSX.Element => {
    const renderPasswordIcon = (): React.JSX.Element => {
      return (
        <View style={commonStyles.flex(0.1)}>
          <Image
            source={Icons.password}
            tintColor={COLORS.secondaryColor}
            resizeMode={String.CONTAIN}
            style={Styles.iconStyle}
          />
        </View>
      );
    };

    const renderPasswordText = (): React.JSX.Element => {
      return (
        <View>
          <Text style={Styles.subHeading}>{String.PASSWORD}</Text>
        </View>
      );
    };

    const renderRightArrow = (): React.JSX.Element => {
      return (
        <Image
          source={Icons.rightArrow}
          resizeMode={String.CONTAIN}
          tintColor={COLORS.secondaryColor}
          style={Styles.iconStyle}
        />
      );
    };

    return (
      <Pressable
        style={Styles.settingsContainer}
        onPress={() => {
          navigation.navigate(String.ADMIN_CHANGE_PASSWORD);
        }}>
        {renderPasswordIcon()}
        <View style={Styles.mainContainer}>
          {renderPasswordText()}
          {renderRightArrow()}
        </View>
      </Pressable>
    );
  };

  const renderSmartLock = (): React.JSX.Element => {
    const renderSmartLockIcon = (): React.JSX.Element => {
      return (
        <View style={commonStyles.flex(0.1)}>
          <Image
            source={Icons.smartLock}
            resizeMode={String.CONTAIN}
            tintColor={COLORS.secondaryColor}
            style={Styles.iconStyle}
          />
        </View>
      );
    };

    const renderSmart = (): React.JSX.Element => {
      return (
        <View>
          <Text style={Styles.subHeading}>{String.SMART_LOCK}</Text>
        </View>
      );
    };

    const renderRightArrow = (): React.JSX.Element => {
      return (
        <ToggleSwitch
          isOn={isSmartLock}
          onColor={COLORS.secondaryColor}
          offColor={COLORS.darkGrey}
          size="small"
          onToggle={isOn => {
            if (isOn == true) {
              checkAndEnableBiometrics().then(res => {
                if (res == true) {
                  notifyandBiomtericApiCall({
                    variables: {
                      input: {
                        faceId: false,
                        pointId: true,
                      },
                    },
                    onCompleted: response => {
                      if (response) {
                        setIsSmartLock(true);
                        console.log(response, 'notification');
                      }
                    },
                  });
                }
              });
            } else {
              AsyncStorage.removeItem('biometricsEnabled');
              notifyandBiomtericApiCall({
                variables: {
                  input: {
                    faceId: false,
                    pointId: false,
                  },
                },
                onCompleted: response => {
                  if (response) {
                    console.log(response, 'notification');
                    Functions.toastMessage('Smart Lock is Disabled');
                    setIsSmartLock(false);
                  }
                },
              });
            }
          }}
        />
      );
    };

    return (
      <View style={Styles.settingsContainer}>
        {renderSmartLockIcon()}
        <View style={Styles.mainContainer}>
          {renderSmart()}
          {renderRightArrow()}
        </View>
      </View>
    );
  };

  const renderLogout = (): React.JSX.Element => {
    const renderLogoutIcon = (): React.JSX.Element => {
      return (
        <View style={commonStyles.flex(0.1)}>
          <Image
            tintColor={COLORS.secondaryColor}
            source={Icons.logOut}
            resizeMode={String.CONTAIN}
            style={Styles.iconStyle}
          />
        </View>
      );
    };

    const renderLog = (): React.JSX.Element => {
      return (
        <View>
          <Text style={Styles.subHeading}>{String.LOG_OUT}</Text>
        </View>
      );
    };

    const renderRightArrow = (): React.JSX.Element => {
      return (
        <Image
          source={Icons.rightArrow}
          tintColor={COLORS.secondaryColor}
          resizeMode={String.CONTAIN}
          style={Styles.iconStyle}
        />
      );
    };

    return (
      <Pressable
        style={Styles.settingsContainer}
        onPress={() => {
          setIsLogoutModal(true);
        }}>
        {renderLogoutIcon()}
        <View style={Styles.mainContainer}>
          {renderLog()}
          {renderRightArrow()}
        </View>
      </Pressable>
    );
  };

  const renderAccountSettings = (): React.JSX.Element => {
    return <Text style={Styles.heading}>{String.ACCOUNT_SETTINGS}</Text>;
  };

  const renderSecurity = (): React.JSX.Element => {
    return <Text style={Styles.heading}>{String.SECURITY}</Text>;
  };

  const renderSessions = (): React.JSX.Element => {
    return <Text style={Styles.heading}>{String.SESSIONS}</Text>;
  };

  const profile = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.ProfileUrl,
  );

  return (
    <SafeAreaView style={Styles.container}>
      <AdminHeader />
      <View style={Styles.subContainer}>
        <View style={Styles.profileCenter}>
          <Pressable style={[Styles.ProfileContainer]}>
            <>
              {profileImage ? (
                <FastImage
                  resizeMode={FastImage.resizeMode.cover}
                  source={
                    Boolean(profileImage)
                      ? {
                          uri: profileImage,
                          priority: FastImage.priority.high,
                          cache: 'immutable',
                        }
                      : Icons.groups
                  }
                  style={Styles.imageStyle}
                />
              ) : (
                <Text
                  style={{
                    color: COLORS.whiteColor,
                    fontWeight: 'bold',
                    fontSize: 22,
                  }}>
                  {Functions.acronym(fullName)}
                </Text>
              )}
            </>
          </Pressable>
        </View>
        {!loader ? (
          <View>
            <View style={Styles.textContainer}>
              <Text style={Styles.t1}>{fullName}</Text>
              <Text style={Styles.t2}>{email}</Text>
            </View>
            <View style={{marginHorizontal: moderateScale(25)}}>
              {renderAccountSettings()}
              {renderEditProfile()}
              {renderPassword()}
              {!checkAndroidVersions ? renderPushNotification() : null}
              {biometricisAvailble && renderSecurity()}
              {biometricisAvailble && renderSmartLock()}
              {renderSessions()}
              {renderLogout()}
              <LogoutModal
                title={String.ARE_YOU_SURE_LOGOUT}
                loading={logOutLoader}
                buttonText1="Stay Logged in"
                buttonText2="Log me out"
                modalVisible={isLogoutModal}
                onBackDropPress={() => setIsLogoutModal(false)}
                onPressModalCancel={() => setIsLogoutModal(false)}
                onPressModalProceed={() => {
                  clickLogout();
                }}
              />
            </View>
          </View>
        ) : (
          <AdminSettingsLoader />
        )}
      </View>
      {isIos && <View style={Styles.fixBackground} />}
    </SafeAreaView>
  );
};

export default AdminSettings;
