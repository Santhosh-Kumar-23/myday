import {useMutation} from '@apollo/client';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  ImageBackground,
  Keyboard,
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
import * as forgotPasswordImages from '../../constants/images';
import * as String from '../../constants/string';
import * as Actions from '../../redux/actions/actions';
import {styles} from '../../styles/authStyles';
import * as Functions from '../../utlis/functions';

const ForgotPassword: React.FC<{}> = (props: any) => {
  // Props Variables
  const {navigation} = props;

  //useState Variables
  const [email, setEmail] = useState<string>('');
  const dispatch: any = useDispatch();
  const [isError, setIsError] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  //mutation
  const [onCallForgotPassword] = useMutation(mutation.ForgotPassword);

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

  // Functions
  const handleUseStatesReset = (): void => {
    setEmail('');
    setIsError(false);
  };

  const renderForgotHeader = (): React.JSX.Element => {
    return (
      <View style={styles.forgotHeader}>
        <Text style={[styles.welcomeBackText, styles.forgotPasswordHeader]}>
          {String.HEADING_FORGOT_PASSWORD}
        </Text>
      </View>
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
          keyboardType="email-address"
          label={String.OFFICIAL_EMAIL}
          value={email}
          onChangeText={e => setEmail(e)}
          error={checkForEmailError}
          errorText={
            checkForValidEmail
              ? String.EMAIL_IS_INVALID
              : String.EMAIL_IS_REQUIRED
          }
          placeholder={String.ENTER_EMAIL}
        />
      );
    };
    const renderButton = (): React.JSX.Element => {
      const handleForgot = (): void => {
        Keyboard.dismiss();

        const checkForEmail: boolean =
          Boolean(email) && !Functions.handleEmailRegExp(email);
        if (checkForEmail) {
          setLoader(true);
          setIsError(false);
          console.log('FORGOT PASSSWORD REQUEST DATA', {
            variables: {
              email: email,
            },
          });

          onCallForgotPassword({
            variables: {
              email: email,
            },
            onCompleted: async data => {
              setLoader(false);
              const {status, message, otp} = data?.forgotPasswordMobile ?? '';
              console.log('Mewssa', message);

              if (status) {
                dispatch(
                  Actions.errorMessage({
                    errorMessage: message,
                    status: true,
                    errorType: ModalErrorType.Success,
                  }),
                );
                setLoader(false);
                navigation.navigate(String.OTP, {
                  receivedOtp: otp,
                  emailAddress: email,
                });
              } else {
                setLoader(false);
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
          setLoader(false);
          setIsError(true);
        }
      };
      return (
        <CommonButton
          title={String.VERIFY_EMAIL}
          onPress={() => {
            !loader && handleForgot();
          }}
          loading={loader}
        />
      );
    };
    return (
      <>
        <View style={styles.forgotSecondView}>
          {renderEmail()}
          {/* <Text style={styles.forgot_login}>{String.LOGIN_FORGOT_PAGE}</Text> */}
        </View>
        <View style={styles.buttonContainer}>{renderButton()}</View>
      </>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardShouldPersistTaps={'handled'}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground
          source={forgotPasswordImages.authBgImage}
          style={styles.loginImgBg}
          resizeMode={String.COVER}>
          {renderForgotHeader()}
          {renderInput()}
        </ImageBackground>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
