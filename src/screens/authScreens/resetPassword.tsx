import {useMutation} from '@apollo/client';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  BackHandler,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
import * as mutation from '../../api/mutation';
import AuthTextInput from '../../components/authTextInput';
import CommonButton from '../../components/commonButton';
import {ModalErrorType} from '../../constants/enums';
import * as Images from '../../constants/images';
import * as String from '../../constants/string';
import {COLORS, Fonts} from '../../constants/theme';
import * as Actions from '../../redux/actions/actions';
import {styles} from '../../styles/authStyles';
import * as CommonStyles from '../../styles/commonStyles';
import * as Functions from '../../utlis/functions';

const ResetPassword: React.FC<{}> = (props: any) => {
  const {navigation} = props;

  const {USER_ID, TYPE} = props?.route?.params ?? '';
  const dispatch: any = useDispatch();

  //got to forgot passoword screen
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.pop(2);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  //useState Variables
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  //Mutations
  const [onCallResetPassword] = useMutation(mutation.resetPassword);

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

  //Functions

  const handleUseStatesReset = (): void => {
    setIsError(false);

    setNewPassword('');

    setConfirmPassword('');
  };

  const renderNewPassword = (): React.JSX.Element => {
    return (
      <View style={CommonStyles.flex(0.3)}>
        <View style={CommonStyles.paddingVertical(0, RFPercentage(7))}>
          <Text style={Styles.setUpHeaderText}>
            {String.SET_UP_NEW_PASSWORD}
          </Text>
        </View>
      </View>
    );
  };

  const renderInput = (): React.JSX.Element => {
    const checkForPasswordEmpty: boolean = !newPassword && isError;

    const checkForValidPassword: boolean =
      Boolean(newPassword) && Functions.handleStrongPassword(newPassword);

    const checkForPasswordError: boolean =
      checkForPasswordEmpty || checkForValidPassword;
    const renderNewPassword = (): React.JSX.Element => {
      return (
        <AuthTextInput
          placeholder={String.ENTER_NEW_PASSWORD}
          label={String.NEW_PASSWORD}
          value={newPassword}
          onChangeText={e => setNewPassword(e)}
          secureTextEntry={true}
          error={checkForPasswordError}
          errorText={
            !checkForValidPassword
              ? String.NEW_PASSWORD_IS_REQUIRED
              : String.STRONG_PASSWORD_ERROR
          }
        />
      );
    };

    const renderConfirmPassword = (): React.JSX.Element => {
      const checkForConfirmPassword: boolean = Boolean(confirmPassword);
      const checkForConfirmPasswordEmpty: boolean = !confirmPassword && isError;
      const checkForEqualPassword: boolean =
        checkForConfirmPassword && confirmPassword == newPassword;
      const checkForValidConfirmPassword: boolean =
        checkForConfirmPassword &&
        newPassword.length >= String.EIGHT &&
        !checkForEqualPassword;

      const checkForConfirmPasswordError: boolean =
        checkForConfirmPasswordEmpty || checkForValidConfirmPassword;
      return (
        <AuthTextInput
          placeholder={String.ENTER_CONFIRM_PASSWORD}
          label={String.CONFIRM_PASSWORD}
          value={confirmPassword}
          onChangeText={e => setConfirmPassword(e)}
          secureTextEntry={true}
          error={checkForConfirmPasswordError}
          errorText={
            !checkForValidConfirmPassword
              ? String.CONFIRM_PASSWORD_IS_REQUIRED
              : String.CONFIRM_PASSWORD_INVALID_ERROR
          }
        />
      );
    };
    return (
      <View
        style={[
          CommonStyles.flex(0.7),
          CommonStyles.paddingVertical(0, RFPercentage(5)),
        ]}>
        {renderNewPassword()}
        {renderConfirmPassword()}
      </View>
    );
  };

  const renderButton = (): React.JSX.Element => {
    const handleReset = (): void => {
      Keyboard.dismiss();
      const checkForPassword: boolean =
        Boolean(newPassword) && !Functions.handleStrongPassword(newPassword);
      const checkForConfirmPassword: boolean = confirmPassword == newPassword;

      if (checkForPassword && checkForConfirmPassword) {
        setLoader(true);
        setIsError(false);

        console.log('REQUEST DATA', {
          variables: {
            userId: USER_ID,
            type: TYPE,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          },
        });

        onCallResetPassword({
          variables: {
            userId: USER_ID,
            type: TYPE,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          },
          onCompleted: async data => {
            setLoader(false);
            const {status, message} = data?.resetPasswordMobile;
            if (status) {
              dispatch(
                Actions.errorMessage({
                  errorMessage: message,
                  status: true,
                  errorType: ModalErrorType.Success,
                }),
              );
              navigation.navigate(String.PASSWORD_SUCCESS_PAGE);
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
        setLoader(false);
      }
      1;
    };

    return (
      <View style={styles.buttonContainer}>
        <CommonButton
          loading={loader}
          title={String.CHANGE_PASSWORD}
          onPress={(): void => {
            handleReset();
          }}
        />
      </View>
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
          source={Images.authBgImage}
          style={styles.loginImgBg}
          resizeMode={String.COVER}>
          {renderNewPassword()}
          {renderInput()}
          {renderButton()}
        </ImageBackground>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  setUpHeaderText: {
    fontSize: 22,
    fontFamily: Fonts.Bold,
    color: COLORS.blackColor,
  },
});

export {ResetPassword};
