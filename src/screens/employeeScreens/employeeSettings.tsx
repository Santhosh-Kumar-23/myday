import {useMutation, useQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {PERMISSIONS, RESULTS, check} from 'react-native-permissions';
import PushNotification from 'react-native-push-notification';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import * as mutations from '../../api/mutation';
import * as Query from '../../api/query';
import * as query from '../../api/query';
import {EmployeeSettingsSubHeader} from '../../components/employeeComponents/employeeSettingsSubHeader';
import DeleteModal from '../../components/modal/deleteModal';
import LogoutModal from '../../components/modal/logoutModal';
import {EmployeeSettingsLoader} from '../../components/skeletonLoader/employeeSettingsLoader';
import {ModalErrorType} from '../../constants/enums';
import * as Icons from '../../constants/icons';
import * as Interfaces from '../../constants/interfaces';
import {getUserInformation} from '../../constants/localStorage';
import * as String from '../../constants/string';
import {COLORS, Fonts} from '../../constants/theme';
import {AppContextType} from '../../constants/types';
import {AppContext} from '../../navigation/appContext/appContext';
import * as Actions from '../../redux/actions/actions';
import store from '../../redux/reducers/store';
import {commonStyles} from '../../styles';
import {Styles} from '../../styles/employeeSettingsStyles';
import {
  checkAndEnableBiometrics,
  checkBiometricIsAvailable,
} from '../../utlis/bioMetrics';
import * as Functions from '../../utlis/functions';
import {requestNotificationPermission} from '../../utlis/pushNotification';
import {resetNavigationStack} from '../../utlis/resetNavigation';
interface QueryVariables {
  deviceType: 'ios' | 'android';
}

const EmployeeSettings: React.FC<{}> = (props: any) => {
  const {navigation} = props;

  const [isPushNotification, setIsPushNotification] = useState<boolean>(false);
  const [isSmartLock, setIsSmartLock] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [userID, setUserId] = useState<string>('');
  const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);
  const [biometricisAvailble, setbiometricisAvailable] = useState(false);
  const [loader, setLoader] = useState<boolean>(true);
  const [logOutLoader, setLogOutLoader] = useState<boolean>(false);
  const [checkAndroidVersions, setCheckAndroidVersion] =
    useState<boolean>(false);
  const dispatch = useDispatch();

  //Hooks Functions
  useEffect(() => {
    getUserInformation()
      .then((data: any) => {
        console.log('GET_USER_INFORMATION:', data);
        setUserId(data?.userId);
      })
      .catch(error => {
        console.log('GET_USER_INFORMATION ERROR:', error);
      });
  }, []);

  const {
    data: employeeDetailsQuery,
    loading: employeeDetailsLoading,
    refetch: refetchEmployee,
    error: getEmployeeERROR,
  } = useQuery(Query.GET_EMPLOYEE_DETAILS, {
    skip: !userID,
    variables: {
      getEmployeeByIdId: userID,
    },
  });
  console.log(employeeDetailsQuery);

  useEffect(() => {
    refetchEmployee();
  }, []);

  const [onCallLogOut] = useMutation(mutations.logOut);
  const [onCallNotificationApi] = useMutation(mutations.NotificationApi);
  const [notifyandBiomtericApiCall] = useMutation(
    mutations.Notification_biomterics,
  );
  const [onCallDeleteAccountApi, {loading: deleteLoading}] = useMutation(
    mutations.DeleteAccountApi,
  );
  const [getImageUrls] = useMutation(mutations.GetViewedUrl);
  const {data} = useQuery(query.getNotificationAndBioStatus, {
    variables: {
      deviceType: Functions.isIos ? 'ios' : 'android',
    },
  });
  const {clearUserInfo} = useContext<AppContextType>(AppContext);
  const getEmployeeDetails = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.getEmployeeDetails,
  );
  const employeeFirstName: string = getEmployeeDetails?.first_name ?? '';
  const employeeLastName: string = getEmployeeDetails?.last_name ?? '';
  const employeeFullName: string = [employeeFirstName, employeeLastName].join(
    ' ',
  );

  const employeeEmail: string = getEmployeeDetails?.email ?? '';
  const profile = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.ProfileUrl,
  );
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  });
  useEffect(() => {
    getImageUrls({
      variables: {
        image: getEmployeeDetails?.profile,
      },
      onCompleted: data => {
        console.log('profileImage', data?.getViewedUrl);
        dispatch(Actions.profileUrl(data?.getViewedUrl));
      },
      onError: error => {
        console.log('error', error);
      },
    });
  }, []);
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
  useEffect(() => {
    setIsPushNotification(data?.getUserBioPointData?.notification);
  }, [data?.getUserBioPointData?.notification]);
  // console.log(data, 'notificationStatus');

  useEffect(() => {
    checkNotificationPermission();
  }, [isPushNotification]);
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
  const notification = async () => {
    const fcmToken = await Functions.getFcmToken();
    const deviceID = await Functions.deviceId();
    const deviceTypee = await Functions.deviceType();
    console.log('fcmToken', fcmToken);

    onCallNotificationApi({
      variables: {
        fcmToken: fcmToken,
        deviceId: deviceID,
        deviceType: deviceTypee,
      },
      onCompleted: data => {
        console.log('EmployeenotificationData', data);
      },
      onError: error => {
        console.log('notificationError', error);
      },
    });
  };

  const bioMetric = async () => {
    const enable = await AsyncStorage.getItem('biometricsEnabled');
    if (enable != null) {
      setIsSmartLock(true);
    } else {
      setIsSmartLock(false);
    }
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
      setIsPushNotification(true);
    } else {
      setIsPushNotification(false);
    }
  };

  const loginStatus = async () => {
    clearUserInfo();
    store.dispatch(Actions.clearReduxStates());
    resetNavigationStack(navigation);
    AsyncStorage.removeItem('biometricsEnabled');
    PushNotification.cancelAllLocalNotifications();
    PushNotification.removeAllDeliveredNotifications();
  };
  const clickLogout = async () => {
    setLogOutLoader(true);
    notification();
    const deviceId = await Functions.deviceId();
    console.log(
      'DEVICEID::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::',
      {
        variables: {deviceId: deviceId},
      },
    );

    onCallLogOut({variables: {deviceId: deviceId}})
      .then(res => {
        const {status, message} = res?.data?.mobileLogout;
        console.log(
          'MESSAGE::::::::::::::::::::::::::::::::::::::::::::::::::::::',
          message,
        );

        if (status) {
          setLogOutLoader(false);
          setIsLogoutModal(false);
          loginStatus();
          navigation.navigate('EmployeeHomeStack');

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
  const onClickDeleteAccount = () => {
    onCallDeleteAccountApi({
      onCompleted: data => {
        const {status, message} = data?.employeeDeleteOtp;
        if (status) {
          navigation.navigate(String.EMPLOYEE_DELETE_ACCOUNT, {
            email: employeeEmail,
          });
          setIsDeleteModal(false);
        }
      },
      onError: error => {
        dispatch(
          Actions.errorMessage({
            errorMessage: (global as any).ErrorMessage,
            status: true,
            errorType: ModalErrorType.Error,
          }),
        );
      },
    });
  };
  const renderProfile = (): React.JSX.Element => {
    return (
      <View style={Styles.profile}>
        <View
          style={[
            Styles.profileContainer,
            {
              backgroundColor: getEmployeeDetails?.profile
                ? COLORS.whiteColor
                : COLORS.darkGrey,
            },
          ]}>
          {imageLoading && (
            <ActivityIndicator
              size={'small'}
              style={{position: 'absolute'}}
              color={'white'}
            />
          )}
          {getEmployeeDetails?.profile ? (
            <FastImage
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
              source={{
                uri: getEmployeeDetails?.profile,
                priority: FastImage.priority.high,
              }}
              style={Styles.imageStyle}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <Text
              style={{
                color: COLORS.whiteColor,
                fontFamily: Fonts.SemiBold,
                paddingTop: 5,
                fontSize: 18,
              }}>
              {Functions.acronym(employeeFullName)}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const renderDivider = (): React.JSX.Element => {
    return <View style={[Styles.dividerStyle]}></View>;
  };

  const renderNameEmail = (): React.JSX.Element => {
    return (
      <View style={Styles.emailContainer}>
        <Text style={Styles.name}>
          {String.HELLO}, {employeeFirstName}
        </Text>
        <Text style={Styles.email}>{employeeEmail}</Text>
      </View>
    );
  };

  const renderEditProfile = (): React.JSX.Element => {
    const renderEditIcon = (): React.JSX.Element => {
      return (
        <View style={commonStyles.flex(0.1)}>
          <Image
            tintColor={COLORS.secondaryColor}
            source={Icons.editProfile}
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
          navigation.navigate(String.EMPLOYEE_EDIT_PROFILE);
        }}>
        {renderEditIcon()}
        <View style={Styles.mainContainer}>
          {renderEdit()}
          {renderRightArrow()}
        </View>
      </Pressable>
    );
  };

  const renderPassword = (): React.JSX.Element => {
    const renderPasswordIcon = (): React.JSX.Element => {
      return (
        <View style={commonStyles.flex(0.1)}>
          <Image
            source={Icons.password}
            resizeMode={String.CONTAIN}
            style={Styles.iconStyle}
            tintColor={COLORS.secondaryColor}
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
          navigation.navigate(String.EMPLOYEE_CHANGE_PASSWORD);
        }}>
        {renderPasswordIcon()}
        <View style={Styles.mainContainer}>
          {renderPasswordText()}
          {renderRightArrow()}
        </View>
      </Pressable>
    );
  };

  const renderConfigureAutomaticPayment = (): React.JSX.Element => {
    const renderConfigureAutomaticIcon = (): React.JSX.Element => {
      return (
        <View style={commonStyles.flex(0.1)}>
          <Image
            source={Icons.autoPayment}
            tintColor={COLORS.secondaryColor}
            resizeMode={String.CONTAIN}
            style={Styles.iconStyle}
          />
        </View>
      );
    };

    const renderConfigure = (): React.JSX.Element => {
      return (
        <View>
          <Text style={Styles.subHeading}>
            {String.CONFIGURE_AUTOMATIC_PAYMENT}
          </Text>
        </View>
      );
    };

    const renderRightArrow = (): React.JSX.Element => {
      return (
        <Image
          source={Icons.rightArrow}
          resizeMode={String.CONTAIN}
          style={Styles.iconStyle}
          tintColor={COLORS.secondaryColor}
        />
      );
    };

    return (
      <Pressable
        style={Styles.settingsContainer}
        onPress={() => {
          dispatch(
            Actions.errorMessage({
              errorMessage: 'update Coming Soon',
              status: true,
              errorType: ModalErrorType.Info,
            }),
          );
          //navigation.navigate(String.EMPLOYEE_AUTO_PAYMENT_SETUP);
        }}>
        {renderConfigureAutomaticIcon()}
        <View style={Styles.mainContainer}>
          {renderConfigure()}
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
          isOn={isPushNotification}
          onColor={COLORS.secondaryColor}
          offColor={COLORS.darkGrey}
          size="small"
          onToggle={isOn => {
            if (isOn == true) {
              setIsPushNotification(true);
              requestNotificationPermission().then(res => {
                if (res) {
                  setIsPushNotification(true);
                } else {
                  Linking.openSettings();
                }
              });
            } else {
              Linking.openSettings().then(response => {
                if (response) {
                  console.log('settingPage', response);
                  checkNotificationPermission();
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

  const renderVerification = (): React.JSX.Element => {
    const renderVerificationIcon = (): React.JSX.Element => {
      return (
        <View style={commonStyles.flex(0.1)}>
          <Image
            source={Icons.verification}
            resizeMode={String.CONTAIN}
            tintColor={COLORS.secondaryColor}
            style={Styles.iconStyle}
          />
        </View>
      );
    };

    const renderVerifications = (): React.JSX.Element => {
      return (
        <View>
          <Text style={Styles.subHeading}>{String.VERIFICATION}</Text>
        </View>
      );
    };

    const renderRightArrow = (): React.JSX.Element => {
      return (
        <Image
          source={Icons.rightArrow}
          resizeMode={String.CONTAIN}
          style={Styles.iconStyle}
          tintColor={COLORS.secondaryColor}
        />
      );
    };

    return (
      <Pressable
        style={Styles.settingsContainer}
        onPress={() => navigation.navigate(String.EMPLOYEE_VERIFICATION)}>
        {renderVerificationIcon()}
        <View style={Styles.mainContainer}>
          {renderVerifications()}
          {renderRightArrow()}
        </View>
      </Pressable>
    );
  };

  const renderPrivacyPolicy = (): React.JSX.Element => {
    const renderPrivacyPolicyIcon = (): React.JSX.Element => {
      return (
        <View style={commonStyles.flex(0.1)}>
          <Image
            tintColor={COLORS.secondaryColor}
            source={Icons.privacy}
            resizeMode={String.CONTAIN}
            style={Styles.iconStyle}
          />
        </View>
      );
    };

    const renderPrivacy = (): React.JSX.Element => {
      return (
        <View>
          <Text style={Styles.subHeading}>{String.PRIVACY_AND_POLICY}</Text>
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
        onPress={() =>
          navigation.navigate(String.EMPLOYEE_TERMS_AND_CONDITION, {
            terms: !true,
            hideHeader: true,
          })
        }>
        {renderPrivacyPolicyIcon()}
        <View style={Styles.mainContainer}>
          {renderPrivacy()}
          {renderRightArrow()}
        </View>
      </Pressable>
    );
  };

  const renderTermsAndConditions = (): React.JSX.Element => {
    const renderTermsIcon = (): React.JSX.Element => {
      return (
        <View style={commonStyles.flex(0.1)}>
          <Image
            tintColor={COLORS.secondaryColor}
            source={Icons.termsAndConditions}
            resizeMode={String.CONTAIN}
            style={Styles.iconStyle}
          />
        </View>
      );
    };

    const renderTerms = (): React.JSX.Element => {
      return (
        <View>
          <Text style={Styles.subHeading}>{String.TERMS_AND_CONDTIONS}</Text>
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
        onPress={() =>
          navigation.navigate(String.EMPLOYEE_TERMS_AND_CONDITION, {
            terms: true,
            hideHeader: true,
          })
        }>
        {renderTermsIcon()}
        <View style={Styles.mainContainer}>
          {renderTerms()}
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
            tintColor={COLORS.secondaryColor}
            source={Icons.smartLock}
            resizeMode={String.CONTAIN}
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
            source={Icons.logOut}
            resizeMode={String.CONTAIN}
            style={Styles.iconStyle}
            tintColor={COLORS.secondaryColor}
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
          resizeMode={String.CONTAIN}
          style={Styles.iconStyle}
          tintColor={COLORS.secondaryColor}
        />
      );
    };

    return (
      <Pressable
        style={Styles.settingsContainer}
        onPress={() => setIsLogoutModal(true)}>
        {renderLogoutIcon()}
        <View style={Styles.mainContainer}>
          {renderLog()}
          {renderRightArrow()}
        </View>
      </Pressable>
    );
  };

  const renderDeleteAccount = (): React.JSX.Element => {
    const renderDeleteAccountIcon = (): React.JSX.Element => {
      return (
        <View style={commonStyles.flex(0.1)}>
          <Image
            tintColor={COLORS.secondaryColor}
            source={Icons.deleteAccount}
            resizeMode={String.CONTAIN}
            style={Styles.iconStyle}
          />
        </View>
      );
    };

    const renderDelete = (): React.JSX.Element => {
      return (
        <View>
          <Text style={Styles.subHeading}>{String.DELETE_ACCOUNT}</Text>
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
        style={[Styles.settingsContainer, {marginBottom: moderateScale(10)}]}
        onPress={() =>
          // navigation.navigate(String.EMPLOYEE_DELETE_ACCOUNT)
          setIsDeleteModal(true)
        }>
        {renderDeleteAccountIcon()}
        <View style={Styles.mainContainer}>
          {renderDelete()}
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
  console.log(checkAndroidVersions, 'checkAndroidVersions');

  return (
    <SafeAreaView style={Styles.container}>
      <EmployeeSettingsSubHeader
        title={String.SETTINGS}
        showBackArrow={false}
      />
      {!loader ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={Styles.container}>
          <View style={{marginHorizontal: moderateScale(25)}}>
            <View style={Styles.topHeader}>
              {renderProfile()}
              {renderNameEmail()}
            </View>
            {renderDivider()}
            {renderAccountSettings()}
            {renderEditProfile()}
            {renderPassword()}
            {/* {renderConfigureAutomaticPayment()} */}
            {!checkAndroidVersions ? renderPushNotification() : null}
            {renderVerification()}
            {renderPrivacyPolicy()}
            {renderTermsAndConditions()}
            {biometricisAvailble && renderSecurity()}
            {biometricisAvailble && renderSmartLock()}
            {renderSessions()}
            {renderLogout()}
            {renderDeleteAccount()}
            <DeleteModal
              loaderColor={true}
              title={String.ARE_YOU_SURE_DELETE}
              buttonText1="Cancel"
              buttonText2="Proceed"
              loader={deleteLoading}
              modalVisible={isDeleteModal}
              onBackDropPress={() => setIsDeleteModal(false)}
              onPressModalProceed={() => {
                onClickDeleteAccount();
              }}
              onPressModalCancel={() => setIsDeleteModal(false)}
            />
            <LogoutModal
              title={String.ARE_YOU_SURE_LOGOUT}
              buttonText1="Stay Logged in"
              loading={logOutLoader}
              buttonText2="Log me out"
              modalVisible={isLogoutModal}
              onBackDropPress={() => setIsLogoutModal(false)}
              onPressModalCancel={() => setIsLogoutModal(false)}
              onPressModalProceed={() => {
                clickLogout();
              }}
            />
          </View>
        </ScrollView>
      ) : (
        <EmployeeSettingsLoader />
      )}
    </SafeAreaView>
  );
};
export {EmployeeSettings};
