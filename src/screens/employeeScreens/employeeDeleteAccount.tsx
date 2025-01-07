import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {OtpInput} from 'react-native-otp-entry';
import PushNotification from 'react-native-push-notification';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import * as mutation from '../../api/mutation';
import CommonButton from '../../components/commonButton';
import {EmployeeSettingsSubHeader} from '../../components/employeeComponents/employeeSettingsSubHeader';
import ErrorModal from '../../components/modal/errorModal';
import {ModalErrorType} from '../../constants/enums';
import * as String from '../../constants/string';
import * as Strings from '../../constants/string';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import {AppContextType} from '../../constants/types';
import {AppContext} from '../../navigation/appContext/appContext';
import * as Actions from '../../redux/actions/actions';
import store from '../../redux/reducers/store';
import {isIos, maskString} from '../../utlis/functions';
import {resetNavigationStack} from '../../utlis/resetNavigation';

const EmployeeDeleteAccount: React.FC<{}> = (props: any) => {
  const {navigation} = props;
  const {email} = props.route.params;
  const otpClearRef = useRef<any>(null);
  const [otpError, setOtpError] = useState<boolean>(false);
  const [otpValue, getOtpValue] = useState<string | undefined>('');
  const [ErrorText, setErrorText] = useState<string | undefined>('');
  const [timeLeft, setTimeLeft] = useState<number>(120); // 120 seconds for 2 minu
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [verifyOtp] = useMutation(mutation.DeleteAccountOtpApi);
  const [onCallDeleteAccountApi, {loading: deleteLoading}] = useMutation(
    mutation.DeleteAccountApi,
  );
  const {clearUserInfo} = useContext<AppContextType>(AppContext);
  const dispatch = useDispatch();

  useEffect(() => {
    // Start the countdown timer
    onStartTimer();
  }, []);
  const onStartTimer = () => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer); // Stop the timer when it reaches 0
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Clear the timer when the component unmounts
    return () => clearInterval(timer);
  };
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const LogoutStatus = () => {
    clearUserInfo();
    store.dispatch(Actions.clearReduxStates());
    resetNavigationStack(navigation);
    AsyncStorage.removeItem('biometricsEnabled');
    PushNotification.cancelAllLocalNotifications();
    PushNotification.removeAllDeliveredNotifications();
  };
  const onClickDeleteAccount = () => {
    verifyOtp({
      variables: {
        otp: otpValue,
      },
      onCompleted: data => {
        console.log('data', data);
        const {status, message} = data?.employeeDeleteAccount ?? '';
        if (status) {
          setSuccessModal(true);
          setOtpError(false);
          setTimeout(() => {
            LogoutStatus();
            navigation.navigate('EmployeeHomeStack');
          }, 5000);
        }
      },
      onError: error => {
        setOtpError(false);
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
  const onClickResend = () => {
    otpClearRef.current.clear();
    onCallDeleteAccountApi({
      onCompleted: data => {
        const {status, message} = data?.employeeDeleteOtp;
        if (status) {
          setTimeLeft(120);
          onStartTimer();
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

  const onPressOk = () => {
    if (otpError) {
      setSuccessModal(false);
      otpClearRef.current.clear();
    } else {
      otpClearRef.current.clear();
      setSuccessModal(false);
      LogoutStatus();
      navigation.navigate('EmployeeHomeStack');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <EmployeeSettingsSubHeader
        title="Delete Account"
        onPress={() => navigation.goBack()}
      />
      <ErrorModal
        modalVisible={successModal}
        errorType={otpError ? ModalErrorType.Error : ModalErrorType.Success}
        title={'Account Deleted Successfully'}
        onOkPress={onPressOk}
        onBackDropPress={onPressOk}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        scrollEnabled={true}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 0.8}}>
          <View style={styles.card}>
            <Text style={styles.info}>{Strings.INFO}</Text>
            <Text style={styles.content}>
              {`We have kept your data after you're deleting your account. Those data will used for the Kreon Auditing purpose..`}
            </Text>
          </View>
          <View style={styles.emailView}>
            <Text style={styles.content}>{Strings.SEND_EMAIL}</Text>
            <Text style={styles.email}>{maskString(email)} </Text>
            <Text style={styles.content}>{Strings.FOR_ACCOUNT_CLOSE}</Text>

            <OtpInput
              numberOfDigits={6}
              ref={otpClearRef}
              onTextChange={text => getOtpValue(text)}
              focusColor={COLORS.secondaryColor}
              theme={{
                containerStyle: styles.otpBoxContainer,
                pinCodeContainerStyle: styles.otp_pinCodeContainer,
                pinCodeTextStyle: styles.pinCodeText,
                focusStickStyle: styles.focusStick,
                focusedPinCodeContainerStyle: styles.activePinCodeContainer,
              }}
            />
            <Text style={styles.wrongOtpText}>{ErrorText}</Text>
          </View>

          <View>
            <Text style={styles.otpTimer}>
              {timeLeft == 0
                ? String.DIDNT_RECEIVED_THE_CODE
                : String.YOUR_CODE_WILL_EXPIRES_IN}{' '}
              {timeLeft !== 0 && formatTime(timeLeft)}
            </Text>
            {deleteLoading ? (
              <ActivityIndicator
                size="small"
                color={COLORS.primaryColor}
                style={{marginTop: 16, marginLeft: 5}}
              />
            ) : (
              <Pressable
                style={styles.resendCodeBtn}
                disabled={timeLeft == 0 ? false : true}
                onPress={onClickResend}>
                <Text
                  style={[
                    styles.resendCodeBtnText,
                    {
                      color:
                        timeLeft == 0
                          ? COLORS.secondaryColor
                          : COLORS.lightGrey,
                    },
                  ]}>
                  {String.RESEND_CODE}
                </Text>
              </Pressable>
            )}
          </View>
        </View>

        <View style={styles.commonButtonView}>
          <CommonButton
            title={Strings.DELETE_ACCOUNT}
            onPress={() => {
              if (otpValue.length == 6) {
                onClickDeleteAccount();
                setErrorText('');
              } else {
                setErrorText('Please Enter Correct OTP');
              }
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EmployeeDeleteAccount;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DashboardBackgroundColor,
  },
  card: {
    alignItems: 'center',
    marginTop: moderateScale(30),
    marginHorizontal: moderateScale(10),
    backgroundColor: COLORS.backgroundColour,
    borderRadius: moderateScale(20),
    padding: moderateScale(10),
    elevation: 5,
    marginBottom: moderateScale(5),
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  info: {
    ...FONTS.h4,
    color: COLORS.darkGrey,
  },
  content: {
    ...FONTS.body4,
    color: COLORS.darkGrey,
  },
  emailView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: moderateScale(25),
    marginVertical: moderateScale(10),
    flexWrap: 'wrap',
  },
  email: {
    ...FONTS.body4,
    color: COLORS.secondaryColor,
    marginLeft: moderateScale(3),
  },
  otpBoxContainer: {
    marginTop: moderateScale(60),
  },
  otp_pinCodeContainer: {
    width: moderateScale(50),
  },
  pinCodeText: {
    color: COLORS.textColor,
    fontFamily: Fonts.Regular,
  },
  focusStick: {},
  activePinCodeContainer: {},
  commonButtonView: {
    flex: 0.2,
    marginHorizontal: moderateScale(10),
    justifyContent: 'flex-end',
    marginBottom: moderateScale(10),
  },
  wrongOtpText: {
    ...FONTS.e1,
    color: COLORS.errorRed,
    marginTop: moderateScale(3),
  },
  resendCodeBtn: {
    alignSelf: 'center',
    marginTop: moderateScale(13),
  },
  resendCodeBtnText: {
    color: COLORS.secondaryColor,
    ...FONTS.body4,
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.secondaryColor,
    // textAlign: 'center',
    // marginTop: moderateScale(7),
    // marginLeft: moderateScale(5),
  },
  otpTimer: {
    alignSelf: 'center',
    ...FONTS.l1,
    color: COLORS.primaryColor,
    textAlign: 'center',
    // marginLeft: moderateScale(20),
    // marginTop: moderateScale(20),
  },
});
