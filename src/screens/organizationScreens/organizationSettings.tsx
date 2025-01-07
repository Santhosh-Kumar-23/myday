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
import * as mutation from '../../api/mutation';
import * as mutations from '../../api/mutation';
import * as query from '../../api/query';
import LogoutModal from '../../components/modal/logoutModal';
import {
  OrganizationHeader,
  OrganizationSubHeader,
} from '../../components/organizationComponents';
import {ModalErrorType} from '../../constants/enums';
import * as Icons from '../../constants/icons';
import * as Interfaces from '../../constants/interfaces';
import * as String from '../../constants/string';
import {COLORS, Fonts} from '../../constants/theme';
import {AppContextType} from '../../constants/types';
import {AppContext} from '../../navigation/appContext/appContext';
import * as Actions from '../../redux/actions/actions';
import store from '../../redux/reducers/store';
import {commonStyles} from '../../styles';
import {Styles} from '../../styles/organizationSettingsStyles';
import {
  checkAndEnableBiometrics,
  checkBiometricIsAvailable,
} from '../../utlis/bioMetrics';
import * as Functions from '../../utlis/functions';
import {isIos} from '../../utlis/functions';
import {requestNotificationPermission} from '../../utlis/pushNotification';
import {organizationResetNavigationStack} from '../../utlis/resetNavigation';

const OrganizationSettings: React.FC<{}> = (props: any) => {
  const {navigation} = props;
  const [isPushNotification, setIsPushNotification] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState(true); // State to track loading
  const dispatch = useDispatch();
  const [isPushNotificationEnabled, setIsPushNotificationEnabled] =
    useState(null);
  const [isSmartLock, setIsSmartLock] = useState<boolean>(false);
  const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  const [logOutLoader, setLogOutLoader] = useState<boolean>(false);
  const [biometricisAvailble, setbiometricisAvailable] = useState(false);
  const [checkAndroidVersions, setCheckAndroidVersion] =
    useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>('');
  const [onCallLogOut] = useMutation(mutations.logOut);

  const getOrganizationDetails = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.getOrganizationDetails,
  );
  const organizationName: string = getOrganizationDetails?.org_name ?? '';
  const organizationEmail: string = getOrganizationDetails?.email ?? '';
  const {data} = useQuery(query.getNotificationAndBioStatus, {
    variables: {
      deviceType: isIos ? 'ios' : 'android',
    },
  });
  const [notifyandBiomtericApiCall] = useMutation(
    mutation.Notification_biomterics,
  );

  (global as any).orgName = organizationName;
  (global as any).org_email = organizationEmail;
  (global as any).org_Profile = profileImage;

  const profileUrl = getOrganizationDetails?.company_logo?.[0]?.file ?? '';

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
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

  const bioMetric = async () => {
    const enable = await AsyncStorage.getItem('biometricsEnabled');
    if (enable != null) {
      setIsSmartLock(true);
    } else {
      setIsSmartLock(false);
    }
  };
  const {clearUserInfo} = useContext<AppContextType>(AppContext);

  const loginStatus = async () => {
    clearUserInfo();
    store.dispatch(Actions.clearReduxStates());
    await AsyncStorage.removeItem('biometricsEnabled');
    organizationResetNavigationStack(navigation);
    PushNotification.cancelAllLocalNotifications();
    PushNotification.removeAllDeliveredNotifications();
  };

  const clickLogout = async () => {
    setLogOutLoader(true);
    const deviceID = await Functions.deviceId();
    console.log('deviceID', deviceID);
    onCallLogOut({variables: {deviceId: deviceID}})
      .then(res => {
        console.log('res', res);
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
        setLogOutLoader(false);
        console.error('Logout Error', error);
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
  const renderProfile = (): React.JSX.Element => {
    return (
      <View style={Styles.profile}>
        <View
          style={[
            Styles.profileContainer,
            {backgroundColor: profileUrl ? COLORS.whiteColor : COLORS.darkGrey},
          ]}>
          <>
            {profileUrl ? (
              <>
                <FastImage
                  onLoadStart={() => setImageLoading(true)}
                  onLoadEnd={() => setImageLoading(false)}
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    uri: profileUrl,
                    priority: FastImage.priority.high,
                    cache: 'immutable',
                  }}
                  style={Styles.imageStyle}
                />
                {imageLoading && (
                  <ActivityIndicator
                    color={COLORS.primaryColor}
                    size={'small'}
                    style={{position: 'absolute'}}
                  />
                )}
              </>
            ) : (
              <Text
                style={{
                  color: COLORS.whiteColor,
                  paddingTop: 5,
                  fontFamily: Fonts.SemiBold,
                  fontSize: 20,
                }}>
                {Functions.acronym((global as any).orgName)}
              </Text>
            )}
          </>
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
        <Text style={Styles.name}>{(global as any).orgName}</Text>
        <Text style={Styles.email}>{(global as any).org_email}</Text>
      </View>
    );
  };

  const renderEditProfile = (): React.JSX.Element => {
    const renderEditIcon = (): React.JSX.Element => {
      return (
        <View style={commonStyles.flex(0.1)}>
          <Image
            source={Icons.editProfile}
            resizeMode={String.CONTAIN}
            style={Styles.iconStyle}
            tintColor={COLORS.secondaryColor}
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
          navigation.navigate(String.ORGANIZATION_EDIT_PROFILE);
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
            tintColor={COLORS.secondaryColor}
            resizeMode={String.CONTAIN}
            style={Styles.iconStyle}
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
          navigation.navigate(String.ORGANIZATION_CHANGE_PASSOWRD);
        }}>
        {renderPasswordIcon()}
        <View style={Styles.mainContainer}>
          {renderPasswordText()}
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
            source={Icons.privacy}
            resizeMode={String.CONTAIN}
            style={Styles.iconStyle}
            tintColor={COLORS.secondaryColor}
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
          navigation.navigate(String.ORGANIZATION_TERMS, {
            terms: !true,
          });
        }}>
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
          navigation.navigate(String.ORGANIZATION_TERMS, {
            terms: true,
          });
        }}>
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
                  setIsSmartLock(true);
                  notifyandBiomtericApiCall({
                    variables: {
                      input: {
                        faceId: false,
                        pointId: true,
                      },
                    },
                    onCompleted: response => {
                      if (response) {
                        console.log(response, 'notification');
                      }
                    },
                  });
                } else {
                  setIsSmartLock(false);
                }
              });
            } else {
              setIsSmartLock(false);
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
            tintColor={COLORS.secondaryColor}
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

  return (
    <SafeAreaView style={Styles.container}>
      <View style={{flex: 1, backgroundColor: COLORS.DashboardBackgroundColor}}>
        <OrganizationHeader title="Profile" />
        <OrganizationSubHeader />

        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          style={Styles.container}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: COLORS.DashboardBackgroundColor,
          }}>
          <View style={{marginHorizontal: moderateScale(25)}}>
            <View style={Styles.topHeader}>
              {renderProfile()}
              {renderNameEmail()}
            </View>
            {renderDivider()}
            {renderAccountSettings()}
            {renderEditProfile()}
            {renderPassword()}
            {renderPrivacyPolicy()}
            {!checkAndroidVersions ? renderPushNotification() : null}
            {biometricisAvailble && renderSecurity()}
            {biometricisAvailble && renderSmartLock()}
            {renderSessions()}
            {renderLogout()}
            <LogoutModal
              title={String.ARE_YOU_SURE_LOGOUT}
              buttonText1="Stay Logged in"
              buttonText2="Log me out"
              loading={logOutLoader}
              modalVisible={isLogoutModal}
              onBackDropPress={() => setIsLogoutModal(false)}
              onPressModalCancel={() => setIsLogoutModal(false)}
              onPressModalProceed={() => {
                clickLogout();
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OrganizationSettings;
