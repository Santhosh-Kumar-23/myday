import {useMutation} from '@apollo/client';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Keyboard,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {OtpInput} from 'react-native-otp-entry';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import * as mutation from '../../api/mutation';
import CommonButton from '../../components/commonButton';
import {ModalErrorType} from '../../constants/enums';
import * as otpImages from '../../constants/images';
import * as OtpString from '../../constants/string';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import * as Actions from '../../redux/actions/actions';
import {commonStyles} from '../../styles';
import {styles} from '../../styles/authStyles';
import * as Functions from '../../utlis/functions';

const Otp: React.FC<{}> = (props: any) => {
  // Props Variables
  const {navigation} = props;
  const {receivedOtp, emailAddress} = props?.route?.params ?? '';
  const dispatch: any = useDispatch();

  console.log(receivedOtp);
  const otpClearRef = useRef<any>(null);

  const [otp, setOtp] = useState<string>('');
  const [helperOtp, setHelperOtp] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(OtpString.OTP_TIMER);
  const [loader, setLoader] = useState<boolean>(false);
  const [resendFetchingStatus, setResendFetchingStatus] =
    useState<boolean>(false);
  const [fetchingStatus, setFetchingStatus] = useState<boolean>(false);

  //Mutations
  const [onCallOtp] = useMutation(mutation.otp);
  const [onCallForgotPassword] = useMutation(mutation.ForgotPassword);

  let intervalId: any,
    userOtp: string = receivedOtp ?? '';

  // Hooks Functions
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

      handleTimer();

      return (): void => {
        isFocus = false;

        clearInterval(intervalId);
      };
    }, []),
  );

  // Functions
  const handleUseStatesReset = (): void => {
    setFetchingStatus(false);

    setHelperOtp(userOtp);

    setIsError(false);

    setOtp('');

    setResendFetchingStatus(false);

    setTimer(OtpString.OTP_TIMER);
  };

  const handleTimer = (): void => {
    if (timer > OtpString.ZERO) {
      intervalId = setInterval(() => {
        setTimer((t: number): number =>
          t > OtpString.ZERO ? t - OtpString.ONE : OtpString.ZERO,
        );
      }, OtpString.TIMER_INTERVAL);
    } else {
      clearInterval(intervalId);
    }
  };

  const RenderWelcome = (): React.JSX.Element => {
    return (
      <View style={styles.otpFirstContainer}>
        <View style={styles.otpSubContainer}>
          <Text style={styles.otpHeaderText}>
            {OtpString.ENTER_VERIFICATION_CODE}
          </Text>
          <Text style={[styles.ToTextContinue, styles.otpEmail]}>
            {Functions.maskString(emailAddress)}
          </Text>
        </View>
      </View>
    );
  };

  const renderWelcome = (): React.JSX.Element => {
    return (
      <View
        style={{
          flex: 0.2,
          // backgroundColor: 'yellow',
          // justifyContent: 'flex-end',
        }}>
        {RenderWelcome()}
      </View>
    );
  };

  const renderEnterCode = (): React.JSX.Element => {
    return <Text style={styles.enterCodeText}>{OtpString.ENTER_CODE}</Text>;
  };

  const renderOtp = (): React.JSX.Element => {
    const checkForOtpEmpty: boolean = !otp && isError;

    const checkForValidOtp: boolean =
      Boolean(otp) && (otp.length != OtpString.SIX || otp != helperOtp);

    const checkForOtpError: boolean = checkForOtpEmpty || checkForValidOtp;
    return (
      <>
        <OtpInput
          autoFocus={false}
          ref={otpClearRef}
          numberOfDigits={6}
          onTextChange={text => setOtp(text)}
          focusColor={COLORS.secondaryColor}
          theme={{
            containerStyle: styles.otpBoxContainer,
            pinCodeContainerStyle: styles.otp_pinCodeContainer,
            // pinCodeContainerStyle: checkForOtpError
            //   ? styles.inputFieldPinCodeErrorContainer
            //   : styles.otp_pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
          }}
        />

        {checkForOtpEmpty && (
          <Text style={styles.wrongOtpText}>{OtpString.OTP_ERROR}</Text>
        )}
        {checkForValidOtp && (
          <View>
            {/* <Text></Text> */}
            <Text style={styles.wrongOtpText}>
              {OtpString.OTP_INVALID_ERROR}
            </Text>
          </View>
        )}
      </>
    );
  };

  const renderLogin = (): React.JSX.Element => {
    return (
      <Pressable style={styles.forgot_login}>
        <Text style={[{color: COLORS.darkGrey, ...FONTS.l1}]}>
          {OtpString.LOGIN_FORGOT_PAGE}
        </Text>
      </Pressable>
    );
  };

  const renderTimer = (): React.JSX.Element => {
    return (
      <Pressable
        disabled={checkForTimer || resendFetchingStatus}
        onPress={(): void => {
          handleResendAPI();
        }}
        style={commonStyles.padding(
          RFPercentage(resendFetchingStatus ? 0.6 : 0.4),
          0,
        )}>
        {resendFetchingStatus ? (
          <ActivityIndicator />
        ) : (
          <>
            <Text
              style={{
                fontFamily: Fonts.Bold,
                color: checkForTimer
                  ? COLORS.secondaryColor
                  : COLORS.primaryColor,
              }}>
              {`${checkForTimer ? ` ${secondsToMin(timer)}` : ''} `}
            </Text>
          </>
        )}
      </Pressable>
    );
  };

  const renderResend = (): React.JSX.Element => {
    return (
      <Text
        disabled={checkForTimer || resendFetchingStatus}
        onPress={(): void => {
          handleResendAPI();
        }}
        style={[
          styles.resendCodeBtnText,
          {color: checkForTimer ? COLORS.grey : COLORS.primaryColor},
        ]}>
        {OtpString.RESEND_CODE}
      </Text>
    );
  };

  const handleResendAPI = (): void => {
    otpClearRef.current.clear();
    setResendFetchingStatus(true);
    console.log('RESEND OTP REQUEST DATA', {
      variables: {
        email: emailAddress,
      },
    });
    onCallForgotPassword({
      variables: {
        email: emailAddress,
      },
    })
      .then(res => {
        setResendFetchingStatus(false);
        const {status, message, otp} = res?.data?.forgotPasswordMobile ?? '';
        if (status) {
          setHelperOtp(otp);
          setTimer(OtpString.OTP_TIMER);
          Functions.toastMessage(message);
        } else {
          Functions.toastMessage(message);
        }
      })
      .catch(error => {
        console.error('RESEND OTP ERROR', error);
        Functions.toastMessage(error.message);
        setResendFetchingStatus(false);
      });
  };

  const renderResetPasswordButton = (): React.JSX.Element => {
    const handleVerify = (): void => {
      setFetchingStatus(true);

      Keyboard.dismiss();
      const checkForOtp: boolean =
        Boolean(otp) && otp.length == OtpString.SIX && otp == helperOtp;
      if (checkForOtp) {
        setIsError(false);
        setLoader(true);
        console.log('OTP REQUEST DATA', {
          variables: {
            otp: helperOtp,
            email: emailAddress,
          },
        });
        onCallOtp({
          variables: {
            otp: helperOtp,
            email: emailAddress,
          },
          onCompleted: async data => {
            setFetchingStatus(false);
            setLoader(false);

            const {status, message} = data?.otpValidation ?? '';
            const {userId, type} = data?.otpValidation?.data ?? '';

            if (status) {
              dispatch(
                Actions.errorMessage({
                  errorMessage: message,
                  status: true,
                  errorType: ModalErrorType.Success,
                }),
              );
              otpClearRef.current.clear();
              navigation.navigate(OtpString.RESET_PASSWORD, {
                USER_ID: userId,
                TYPE: type,
              });
            } else {
              dispatch(
                Actions.errorMessage({
                  errorMessage: (global as any).ErrorMessage,
                  status: true,
                  errorType: ModalErrorType.Error,
                }),
              );
            }
          },

          onError: error => {
            setLoader(false);
            dispatch(
              Actions.errorMessage({
                errorMessage: (global as any).ErrorMessage,
                status: true,
                errorType: ModalErrorType.Error,
              }),
            );
          },
        });
      } else {
        setIsError(true);
        setFetchingStatus(false);
        setLoader(false);
      }
    };
    return (
      <View style={{marginTop: moderateScale(50)}}>
        <CommonButton
          loading={loader}
          title={OtpString.RESET_PASSWORD}
          onPress={(): void => {
            !loader && handleVerify();
          }}
        />
      </View>
    );
  };

  const secondsToMin = (time: number): string => {
    const min: number = Math.floor(time / OtpString.SIXTY);

    const minutes: number | string =
      min >= OtpString.ONE
        ? String(min).length == OtpString.ONE
          ? `0${min}`
          : min
        : OtpString.TWO_ZERO;

    const sec: number = time - min * OtpString.SIXTY;

    const seconds =
      sec >= OtpString.ONE
        ? String(sec).length == OtpString.ONE
          ? `0${sec}`
          : sec
        : OtpString.TWO_ZERO;

    return minutes + ':' + seconds;
  };

  const checkForTimer: boolean = timer > OtpString.ZERO;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        scrollEnabled={true}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground
          source={otpImages.authBgImage}
          style={styles.loginImgBg}
          resizeMode={OtpString.COVER}>
          {renderWelcome()}
          <View
            style={{
              flex: 0.8,
              // backgroundColor: 'lime',
              justifyContent: 'center',
            }}>
            <View style={styles.otpInputContainer}>
              {renderEnterCode()}
              {renderOtp()}
              {/* {renderLogin()} */}
              <View style={styles.resendContainer}>
                <Text style={styles.otpTimer}>
                  {!checkForTimer
                    ? OtpString.DIDNT_RECEIVED_THE_CODE
                    : OtpString.YOUR_CODE_WILL_EXPIRES_IN}
                </Text>
                {renderTimer()}
              </View>
              {renderResend()}
            </View>
            {renderResetPasswordButton()}
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Otp;
