import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useContext, useState} from 'react';
import {
  BackHandler,
  ImageBackground,
  Keyboard,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import * as mutation from '../../api/mutation';
import AuthTextInput from '../../components/authTextInput';
import CommonButton from '../../components/commonButton';
import {ModalErrorType} from '../../constants/enums';
import * as loginImages from '../../constants/images';
import * as InterFaces from '../../constants/interfaces';
import * as localStorage from '../../constants/localStorage';
import * as String from '../../constants/string';
import * as loginStrings from '../../constants/string';
import {AppContextType} from '../../constants/types';
import {AppContext} from '../../navigation/appContext/appContext';
import * as Actions from '../../redux/actions/actions';
import * as loginTypes from '../../redux/types/reduxtypes';
import {styles} from '../../styles/authStyles';
import {checkBiometricIsAvailable} from '../../utlis/bioMetrics';
import * as Functions from '../../utlis/functions';
import {requestNotificationPermission} from '../../utlis/pushNotification';
const Login: React.FC<{}> = (props: any) => {
  // Props Variables
  const {navigation} = props;

  //useState Variables
  const [exitCount, setExitCount] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [enableNotification, setEnableNotification] = useState<boolean>(false);
  const [loginApiCall] = useMutation(mutation.loginDetails);
  const [notifyandBiomtericApiCall] = useMutation(
    mutation.Notification_biomterics,
  );

  //Redus
  const dispatch: any = useDispatch();
  const {Employee, Organization, Admin, AuthStack} =
    useContext<AppContextType>(AppContext);

  //Hook Functions
  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      handleUseStatesReset();

      return (): void => {
        isFocus = false;
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      BackHandler.addEventListener('hardwareBackPress', backAction);

      return (): void => {
        isFocus = false;

        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, [exitCount]),
  );

  // Functions
  const handleUseStatesReset = (): void => {
    setEmail('');
    setIsError(false);
    setPassword('');
  };

  const backAction = (): boolean => {
    switch (exitCount) {
      case 0:
        setExitCount(exitCount + 1);

        Functions.toastMessage(String.EXIT_APP_TOAST);
        break;

      case 1:
        setExitCount(0);

        Functions.handleExitApp();
        break;

      default:
        break;
    }

    return true;
  };

  const RenderWelcome = (): React.JSX.Element => {
    return (
      <View style={styles.welcomeContainer}>
        <View style={styles.welcomeSubContainer}>
          <Text style={styles.welcomeBackText}>
            {loginStrings.WELCOME_BACK}
          </Text>
          <Text style={styles.ToTextContinue}>
            {loginStrings.LOGIN_TO_CONTINUE}
          </Text>
        </View>
      </View>
    );
  };

  const renderSignUp = (): React.JSX.Element => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate(String.SIGN_UP);
        }}
        style={styles.signUpContainer}>
        <Text style={styles.didNotHaveAnyAccount}>
          {String.DIDNT_HAVE_ANY_ACCOUNT}
        </Text>
        <Text style={styles.didNotHaveAnyAccount_SignUp}>{String.SIGN_UP}</Text>
      </Pressable>
    );
  };

  const renderInput = (): React.JSX.Element => {
    const renderEmail = (): React.JSX.Element => {
      const checkForEmailEmpty: boolean = !email && isError;
      const checkForValidEmail: boolean =
        Boolean(email) && Functions.handleEmailRegExp(email);
      const checkForEmailError: boolean =
        checkForEmailEmpty || checkForValidEmail;
      return (
        <AuthTextInput
          label={loginStrings.OFFICIAL_EMAIL}
          placeholder={String.ENTER_EMAIL}
          keyboardType="email-address"
          value={email}
          onChangeText={(txt: string): void => {
            setEmail(txt);
          }}
          error={checkForEmailError}
          errorText={
            checkForValidEmail
              ? String.EMAIL_IS_INVALID
              : String.EMAIL_IS_REQUIRED
          }
        />
      );
    };

    const renderPassword = (): React.JSX.Element => {
      const checkForPasswordEmpty: boolean = !password && isError;
      const checkForValidPassword: boolean =
        Boolean(password) && Functions.handleStrongPassword(password);
      const checkForPasswordError: boolean =
        checkForPasswordEmpty || checkForValidPassword;
      return (
        <AuthTextInput
          label={loginStrings.PASSWORD}
          value={password}
          placeholder={String.ENTER_YOUR_PASSWORD}
          onChangeText={e => setPassword(e)}
          secureTextEntry={true}
          error={checkForPasswordError}
          errorText={
            !checkForValidPassword
              ? String.PASSSWORD_IS_REQUIRED
              : String.STRONG_PASSWORD_ERROR
          }
        />
      );
    };

    const renderForgotPassword = (): React.JSX.Element => {
      return (
        <Pressable
          style={styles.forgotPasswordBtn}
          onPress={() => {
            navigation.navigate(String.FORGOT_PASSWORD);
          }}>
          <Text style={styles.forgotPasswordText}>
            {loginStrings.FORGOT_PASSWORD_}
          </Text>
        </Pressable>
      );
    };

    return (
      <View style={styles.inputContainer}>
        {renderEmail()}
        {renderPassword()}
        {renderForgotPassword()}
      </View>
    );
  };

  const renderButton = (): React.JSX.Element => {
    const handleSignIn = async (): Promise<void> => {
      Keyboard.dismiss();
      const checkForEmail: boolean =
        Boolean(email) && !Functions.handleEmailRegExp(email);
      const checkForPassword: boolean =
        Boolean(password) && !Functions.handleStrongPassword(password);
      if (checkForEmail && checkForPassword) {
        setIsError(false);
        setLoading(true);
        try {
          loginApiCall({
            variables: {
              input: {
                email: email,
                password: password,
                deviceType: await Functions.deviceType(),
                deviceId: await Functions.deviceId(),
              },
            },
            onCompleted: async data => {
              setLoading(true);
              const {status, message} = data?.loginMobile ?? '';
              console.log('accessTOken', data.loginMobile.token);
              console.log('RefreshTOken', data.loginMobile.refreshToken);
              console.log('loginMobile', data.loginMobile);
              const deviceType = await Functions.deviceType();
              const deviceId = await Functions.deviceId();
              console.log('deviceType:::::::::::::', deviceType);
              console.log('deviceId::::::::::', deviceId);
              const hasLaunched = await AsyncStorage.getItem('hasLaunched');
              console.log(data.loginMobile, 'Login Response');
              if (!hasLaunched) {
                const token = data.loginMobile.token;
                const type = data.loginMobile.type;
                const userId = data.loginMobile.userId;
                const refreshToken = data.loginMobile.refreshToken;
                console.log(type, 'token');
                let notification = false;
                let biometricStatus = false;
                setTimeout(() => {
                  Functions.toastMessage('You are successfully logged in');
                }, 3000);
                onClickLogin(token, type, userId, refreshToken);
                console.log(data, 'Login Response');
                await AsyncStorage.setItem('hasLaunched', 'true');
                requestNotificationPermission()
                  .then(response => {
                    console.log(response, 'notification Permission');
                    notifyandBiomtericApiCall({
                      variables: {
                        input: {
                          notification: response,
                        },
                      },
                      onCompleted: response => {
                        if (response) {
                          console.log(
                            response.data.notification,
                            'notification',
                          );
                          notification = response.data.notification;
                          setEnableNotification(response.data.notification);
                        }
                      },
                    });
                    console.log('Notification permission granted');
                  })
                  .catch(error => {
                    notifyandBiomtericApiCall({
                      variables: {
                        input: {
                          notification: false,
                        },
                      },
                      onCompleted: response => {
                        if (response) {
                          console.log(response, 'notification Dont Allow');
                          setEnableNotification(response.data.notification);
                        }
                      },
                    });
                    console.error(
                      'Error checking notification permission:',
                      error,
                    );
                  })
                  .finally(async () => {
                    const checkBiometricAvaiablity =
                      await checkBiometricIsAvailable();
                    if (checkBiometricAvaiablity) {
                      dispatch(Actions.biometricsModal(true));
                    }
                  });
                console.log(notification, '====>notificationOutside');
              } else {
                const token = data.loginMobile.token;
                const type = data.loginMobile.type;
                const userId = data.loginMobile.userId;
                const refreshToken = data.loginMobile.refreshToken;
                setEnableNotification(data.loginMobile.notification);
                onClickLogin(token, type, userId, refreshToken);
                setTimeout(() => {
                  Functions.toastMessage('You are successfully logged in');
                }, 2000);
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
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      } else {
        setIsError(true);
      }
    };
    console.log(loading, 'loading');
    return (
      <View style={styles.buttonContainer}>
        <CommonButton
          title={String.lOG_IN}
          loading={loading}
          onPress={() => {
            handleSignIn();
          }}
        />
      </View>
    );
  };

  async function onClickLogin(
    token: string,
    type: string,
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    try {
      // Simulate login and fetch user role
      console.log(type, 'userType');
      console.log('notificationStatus', enableNotification);
      const userData = {
        role:
          type == 'Employee'
            ? loginTypes.Employee
            : type == 'Organization'
            ? loginTypes.Organization
            : type == 'Owner'
            ? loginTypes.Admin
            : null, // Change this to 'Employee' or 'Organization' as needed
        token: token,
        email: email,
        userId: userId,
        refreshToken: refreshToken,
      };
      const userdetails: InterFaces.userData[] = [
        {
          email: email,
          token: token,
          role: type,
          userId: userId,
          refreshToken: refreshToken,
        },
      ];
      dispatch(Actions.gettingUserData(userdetails));
      await localStorage.setUserInformation(userData);

      // Call the appropriate context method based on user role
      switch (userData.role) {
        case loginTypes.Admin:
          Admin();
          break;
        case loginTypes.Organization:
          Organization();
          break;
        case loginTypes.Employee:
          Employee();
          break;
        default:
          AuthStack();
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.loginContainer}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardShouldPersistTaps={'handled'}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground
          source={loginImages.authBgImage}
          style={styles.loginImgBg}
          resizeMode={String.COVER}>
          {RenderWelcome()}
          {renderInput()}
          {renderSignUp()}
          {renderButton()}
        </ImageBackground>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
