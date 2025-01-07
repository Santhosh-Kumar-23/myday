import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import * as mutation from '../../api/mutation';
import {AdminHeader} from '../../components/adminComponents';
import AuthTextInput from '../../components/authTextInput';
import CommonButton from '../../components/commonButton';
import {ModalErrorType} from '../../constants/enums';
import * as Interfaces from '../../constants/interfaces';
import * as String from '../../constants/string';
import {COLORS} from '../../constants/theme';
import * as Actions from '../../redux/actions/actions';
import {Styles} from '../../styles/adminChangePasswordStyles';
import * as Functions from '../../utlis/functions';
import {isIos} from '../../utlis/functions';

const AdminChangePassword: React.FC<{}> = (props: any) => {
  //props variables
  const {navigation} = props;
  const dispatch = useDispatch();
  const profile = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.ProfileUrl,
  );

  const mobileUserData = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.mobileUserData,
  );

  const firstName = mobileUserData?.user?.firstName ?? '';
  const LastName = mobileUserData?.user?.lastName ?? '';
  const fullName = [firstName, LastName].join(' ');

  const profileImage = mobileUserData?.user?.profile ?? '';

  // UseState variables
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  //mutation
  const [onCallChangePassword] = useMutation(mutation.adminChangePassword);

  //UI functions
  const renderCurrentPassword = (): React.JSX.Element => {
    const checkForCurrentPasswordEmpty: boolean = !currentPassword && isError;

    const checkForCurrentPasswordError: boolean = checkForCurrentPasswordEmpty;
    return (
      <AuthTextInput
        placeholder={String.ENTER_CURRENT_PASSWORD}
        label={String.CURRENT_PASSWORD}
        value={currentPassword}
        onChangeText={e => setCurrentPassword(e)}
        secureTextEntry={true}
        error={checkForCurrentPasswordError}
        errorText={'Current passowrd is required'}
      />
    );
  };

  const renderNewPassword = (): React.JSX.Element => {
    const checkForPasswordEmpty: boolean = !newPassword && isError;

    const checkForValidPassword: boolean =
      Boolean(newPassword) && Functions.handleStrongPassword(newPassword);

    const checkForPasswordError: boolean =
      checkForPasswordEmpty || checkForValidPassword;
    return (
      <AuthTextInput
        placeholder={String.ENTER_YOUR_PASSWORD}
        label={String.NEW_PASSWORD}
        value={newPassword}
        onChangeText={e => setNewPassword(e)}
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
      <View style={{marginBottom: RFPercentage(2)}}>
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
      </View>
    );
  };

  const renderButton = (): React.JSX.Element => {
    const handleSave = (): void => {
      const checkForCurrentPassword: boolean = Boolean(currentPassword);
      const checkForPassword: boolean =
        Boolean(newPassword) && !Functions.handleStrongPassword(newPassword);
      const checkForConfirmPassword: boolean = confirmPassword == newPassword;
      if (
        checkForCurrentPassword &&
        checkForPassword &&
        checkForConfirmPassword
      ) {
        setIsError(false);
        setLoader(true);
        onCallChangePassword({
          variables: {
            input: {
              oldPassword: currentPassword,
              newPassword: newPassword,
              confirmPassword: confirmPassword,
            },
          },
          onCompleted: async data => {
            setLoader(false);
            const {status, message, otp} = data.changePassword;
            if (status) {
              dispatch(
                Actions.errorMessage({
                  errorMessage: message,
                  status: true,
                  errorType: ModalErrorType.Success,
                }),
              );

              navigation.goBack();
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
            console.error('Chnage Password Error', error);
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
      }
    };

    return (
      <View style={Styles.buttonContainer}>
        <CommonButton
          loading={loader}
          title={String.SAVE}
          onPress={(): void => {
            !loader && handleSave();
          }}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={Styles.mainContainer}>
      <AdminHeader back={true} />
      <View style={Styles.mainSubContainer}>
        <View style={Styles.profileCenter}>
          <Pressable style={Styles.ProfileContainer}>
            <>
              {profileImage ? (
                <FastImage
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    uri: profileImage,
                    priority: FastImage.priority.high,
                    cache: 'immutable',
                  }}
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
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps={'handled'}
          scrollEnabled={true}
          style={{backgroundColor: COLORS.DashboardBackgroundColor}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={Styles.subContainer}>
            <View style={{flex: 0.5}}>
              <Text style={Styles.heading}>{String.CHANGE_PASSWORD}</Text>
              {renderCurrentPassword()}
              {renderNewPassword()}
              {renderConfirmPassword()}
            </View>
            <View style={{flex: 0.5}}>{renderButton()}</View>
          </View>
        </KeyboardAwareScrollView>
      </View>
      {isIos && <View style={Styles.fixBackground} />}
    </SafeAreaView>
  );
};

export default AdminChangePassword;
