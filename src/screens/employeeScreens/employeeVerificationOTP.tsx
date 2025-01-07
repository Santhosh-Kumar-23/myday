import {useMutation} from '@apollo/client';
import React, {useEffect, useRef, useState} from 'react';
import {
  DeviceEventEmitter,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {OtpInput} from 'react-native-otp-entry';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import * as mutation from '../../api/mutation';
import CommonButton from '../../components/commonButton';
import {EmployeeLoanRequestSubHeader} from '../../components/employeeComponents/employeeLoanRequestSubHeader';
import ErrorModal from '../../components/modal/errorModal';
import {ModalErrorType} from '../../constants/enums';
import * as Images from '../../constants/images';
import * as String from '../../constants/string';
import {COLORS} from '../../constants/theme';
import {styles} from '../../styles/authStyles';
import {maskAaadharNumber} from '../../utlis/functions';

const EmployeeVerificationOTP: React.FC<{}> = (props: any) => {
  const {navigation, route} = props;
  const otpClearRef = useRef<any>(null);
  const {transId, aadharNo, docType} = route.params;
  const [otpValue, getOtpValue] = useState<string | undefined>('');
  const [error, setError] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [SuccessMessage, setSucesssMesaage] = useState<string>('');
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(120); // 120 seconds for 2 minutes\
  const [otpError, setOtpError] = useState<boolean>(false);
  const [verifyAadharOtp] = useMutation(mutation.VerifyAadharOtp);
  const [generateAadharOtpApiCall] = useMutation(mutation.GenerateAadharOtp);
  const [TransId, setTransId] = useState<any>(transId);
  console.log(timeLeft, 'timeLeft');

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

  const onSubmitOtp = () => {
    const checkValidateOTP: boolean = otpValue !== '' && otpValue.length === 6;
    console.log(checkValidateOTP, 'checkValidateOTP');
    if (checkValidateOTP) {
      setError(false);
      setButtonLoader(true);
      verifyAadharOtp({
        variables: {
          transId: TransId,
          otp: Number(otpValue),
        },
        onCompleted: data => {
          const {status, msg} = data?.verifyAadharOtp ?? '';
          if (status) {
            setButtonLoader(false);
            setSuccessModal(true);
            setOtpError(false);
            setSucesssMesaage('OTP Verified Successfully');
            DeviceEventEmitter.emit('REFETCH_EMPLOYEE_DETAILS');
          }
          console.log('data', data);
        },
        onError: error => {
          setButtonLoader(false);
          setOtpError(true);
          setSuccessModal(true);
          setSucesssMesaage((global as any).ErrorMessage);
          console.log('error', error);
        },
      });
    } else {
      setError(true);
    }
  };

  const onPressOk = () => {
    if (otpError) {
      setSuccessModal(false);
      otpClearRef.current.clear();
    } else {
      setSuccessModal(false);
      otpClearRef.current.clear();
      DeviceEventEmitter.emit('REFETCH_EMPLOYEE_DETAILS');
      navigation.navigate(String.EMPLOYEE_VERIFICATION);
    }
  };

  const RenderWelcome = (): React.JSX.Element => {
    return (
      <View style={styles.otpFirstContainer}>
        <View style={styles.otpSubContainer}>
          <Text style={styles.otpHeaderText}>
            {String.ENTER_VERIFICATION_CODE}
          </Text>
          <Text style={[styles.ToTextContinue, styles.otpEmail]}>
            {String.SEND_YOUR_EMAIL}
            {maskAaadharNumber(aadharNo)}
          </Text>
        </View>
      </View>
    );
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const onClickResendCode = () => {
    getOtpValue('');
    otpClearRef.current.clear();
    generateAadharOtpApiCall({
      variables: {
        aadharNo: aadharNo,
        docType: docType,
      },
      onCompleted: data => {
        const {status, message, otp, msg, tsTransId} =
          data?.generateAadharOtp ?? '';
        if (status) {
          setTransId(tsTransId);
          setTimeLeft(120);
          onStartTimer();
        }
      },
      onError: error => {
        console.log('error', error);
      },
    });
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <EmployeeLoanRequestSubHeader
        title={'OTP'}
        onPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        scrollEnabled={true}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{paddingHorizontal: moderateScale(20), flex: 1}}>
          <View style={{flex: 0.4}}>
            <View>{RenderWelcome()}</View>
            <View
              style={{
                height: verticalScale(160),
                width: scale(160),
                alignSelf: 'center',
                marginTop: 10,
              }}>
              <Image
                source={Images.otp}
                resizeMode={String.CONTAIN}
                style={{height: '100%', width: '100%'}}
              />
            </View>

            <View style={styles.otpInputContainer}>
              <Text style={styles.enterCodeText}>{String.ENTER_CODE}</Text>
              <OtpInput
                numberOfDigits={6}
                ref={otpClearRef}
                onTextChange={text => getOtpValue(text)}
                focusColor={COLORS.secondaryColor}
                autoFocus={false}
                theme={{
                  containerStyle: styles.otpBoxContainer,
                  pinCodeContainerStyle: styles.otp_pinCodeContainer,
                  pinCodeTextStyle: styles.pinCodeText,
                  focusStickStyle: styles.focusStick,
                  focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                }}
              />
              {error && (
                <Text style={styles.wrongOtpText}>{String.WRONG_OTP}</Text>
              )}
              <Pressable style={styles.forgot_login}></Pressable>
              <Text style={styles.otpTimer}>
                {timeLeft == 0
                  ? String.DIDNT_RECEIVED_THE_CODE
                  : String.YOUR_CODE_WILL_EXPIRES_IN}{' '}
                {timeLeft !== 0 && formatTime(timeLeft)}
              </Text>
              <Pressable
                style={styles.resendCodeBtn}
                disabled={timeLeft == 0 ? false : true}
                onPress={onClickResendCode}>
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
            </View>
          </View>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'center',
            }}>
            <View>
              <CommonButton
                title={'Verify OTP'}
                loading={buttonLoader}
                onPress={(): void => {
                  onSubmitOtp();
                }}
              />
              <View
                style={{
                  height: verticalScale(20),
                  width: scale(80),
                  alignSelf: 'center',
                  marginTop: 10,
                }}>
                <Image
                  source={Images.truth}
                  resizeMode={String.CONTAIN}
                  style={{height: '100%', width: '100%'}}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <ErrorModal
        modalVisible={successModal}
        errorType={otpError ? ModalErrorType.Error : ModalErrorType.Success}
        title={SuccessMessage}
        onBackDropPress={onPressOk}
        onOkPress={onPressOk}
      />
    </SafeAreaView>
  );
};

export default EmployeeVerificationOTP;
