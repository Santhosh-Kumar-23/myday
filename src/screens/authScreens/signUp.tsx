import {useLazyQuery, useMutation} from '@apollo/client';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {EMPLOYEE_SIGUP} from '../../api/mutation';
import {CHOOSE_ORGANIZATION} from '../../api/query';
import AuthTextInput from '../../components/authTextInput';
import CommonButton from '../../components/commonButton';
import ErrorModal from '../../components/modal/errorModal';
import VectorIcons from '../../components/vectorIcons';
import {ModalErrorType} from '../../constants/enums';
import * as SignUpImages from '../../constants/images';
import * as InterFaces from '../../constants/interfaces';
import * as localStorage from '../../constants/localStorage';
import * as String from '../../constants/string';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import {AppContextType} from '../../constants/types';
import {AppContext} from '../../navigation/appContext/appContext';
import * as Actions from '../../redux/actions/actions';
import * as loginTypes from '../../redux/types/reduxtypes';
import {styles} from '../../styles/authStyles';
import * as Functions from '../../utlis/functions';

const SignUp: React.FC<{}> = (props: any) => {
  // Props Variables
  const {navigation} = props;

  //useState Variables
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [chooseOrganizationId, setChooseOrganizationId] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [organizationList, setOrganizationList] = useState([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [SuccessMessage, setSucesssMesaage] = useState<string>('');

  //Mutations

  const [onCallSignUp] = useMutation(EMPLOYEE_SIGUP);

  //Query
  const [onCAll, {loading}] = useLazyQuery(CHOOSE_ORGANIZATION);

  useEffect(() => {
    onCAll()
      .then(res => {
        const organizations = res?.data?.getAllOrganizationForList ?? [];
        const convertedOrganizationData = organizations.map(
          (item: any, index: number) => {
            return {
              label: item.org_name,
              value: item._id,
            };
          },
        );
        setOrganizationList(convertedOrganizationData);
        console.log('organizationList::::::::::::::::::::::', organizationList);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  console.log(organizationList);

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

  // Functions
  const handleUseStatesReset = (): void => {
    setEmail('');

    setIsError(false);

    setNewPassword('');

    setConfirmPassword('');

    setChooseOrganizationId('');
  };
  async function onClickLogin(): Promise<void> {
    try {
      // Simulate login and fetch user role

      const userData = {
        role:
          email == 'test@employee.com'
            ? loginTypes.Employee
            : email == 'test@organization.com'
            ? loginTypes.Organization
            : email == 'test@admin.com'
            ? loginTypes.Admin
            : null, // Change this to 'Employee' or 'Organization' as needed
      };
      const userdetails: InterFaces.userData[] = [
        {
          email: email,
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

  const emptyData = [
    {
      label: 'No organization found',
      value: '',
    },
  ];

  const isorganizationList =
    organizationList.length > 0 ? organizationList : emptyData;

  const renderWelcome = (): React.JSX.Element => {
    return (
      <View style={styles.welcomeContainer}>
        <View style={styles.welcomeSubContainer}>
          <Text style={styles.welcomeBackText}>{String.WELCOME_BACK}</Text>
          <Text style={styles.ToTextContinue}>
            {String.REGISTER_TO_CONTINUE}
          </Text>
        </View>
      </View>
    );
  };
  const renderInput = (): React.JSX.Element => {
    const checkForChooseOrganization: boolean =
      !chooseOrganizationId && isError;
    const renderChooseOrganization = (): React.JSX.Element => {
      return (
        <>
          <View
            style={[
              styles.dropDownContainer,
              {
                borderColor: !checkForChooseOrganization
                  ? COLORS.lightGrey
                  : COLORS.errorRed,
              },
            ]}>
            <RNPickerSelect
              placeholder={{
                label: 'Select organization',
                value: '', // This is important to not have any default selection
                // color: 'black', // Optional: Placeholder text color
              }}
              style={
                Functions.isIos
                  ? {
                      inputIOS: pickerStyle.inputIOS,
                      chevronUp: {display: 'none'},
                      chevronDown: {display: 'none'},
                      done: {color: COLORS.secondaryColor},
                    }
                  : pickerStyle
              }
              useNativeAndroidPickerStyle={false}
              onValueChange={value => {
                setChooseOrganizationId(value);
                console.log(value);
              }}
              items={isorganizationList}
              Icon={() => {
                return (
                  <VectorIcons
                    type={Functions.isIos ? 'ionicon' : 'fa'}
                    name={Functions.isIos ? 'caret-down-outline' : 'caret-down'}
                    size={RFPercentage(3)}
                    style={{
                      marginRight: Functions.isIos ? null : RFPercentage(2.5),
                      marginTop: Functions.isIos ? null : RFPercentage(1.5),
                    }}
                    color={COLORS.darkGrey}
                  />
                );
              }}
            />
          </View>
          {checkForChooseOrganization ? (
            <Text
              style={{
                color: COLORS.errorRed,
                fontSize: 12,
                fontFamily: Fonts.Medium,
                marginLeft: moderateScale(10),
                marginTop: moderateScale(5),
              }}>
              {String.ORGANIZATION_IS_REQUIRED}
            </Text>
          ) : null}
        </>
      );
    };

    const renderEmail = (): React.JSX.Element => {
      const checkForEmailEmpty: boolean = !email && isError;

      const checkForValidEmail: boolean =
        Boolean(email) && Functions.handleEmailRegExp(email);

      const checkForEmailError: boolean =
        checkForEmailEmpty || checkForValidEmail;

      return (
        <AuthTextInput
          label={String.OFFICIAL_EMAIL}
          keyboardType="email-address"
          placeholder={String.ENTER_YOUR_EMAIL}
          value={email}
          onChangeText={e => setEmail(e)}
          error={checkForEmailError}
          errorText={
            checkForValidEmail
              ? String.EMAIL_IS_INVALID
              : String.EMAIL_IS_REQUIRED
          }
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

    return (
      <View style={[styles.inputContainer]}>
        <View>
          <Text style={styles.chooseOrganization}>
            {String.CHOOSE_ORGANIZATION}
          </Text>
          {renderChooseOrganization()}
          {renderEmail()}
          {renderNewPassword()}
          {renderConfirmPassword()}
        </View>
      </View>
    );
  };

  const renderLogin = (): React.JSX.Element => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate(String.lOG_IN);
        }}
        style={styles.signUpContainer}>
        <Text style={styles.didNotHaveAnyAccount}>
          {String.ALREADY_HAVE_AN_ACCOUNT}
        </Text>
        <Text style={styles.didNotHaveAnyAccount_SignUp}>{String.lOG_IN}</Text>
      </Pressable>
    );
  };

  const renderButton = (): React.JSX.Element => {
    const handleSignUp = async (): void => {
      Keyboard.dismiss();
      const checkForTermsandConditions: boolean = Boolean(checkbox);
      const checkForChooseOrganization: boolean = Boolean(chooseOrganizationId);
      const checkForEmail: boolean =
        Boolean(email) && !Functions.handleEmailRegExp(email);
      const checkForPassword: boolean =
        Boolean(newPassword) && !Functions.handleStrongPassword(newPassword);
      const checkForConfirmPassword: boolean = confirmPassword == newPassword;
      if (
        checkForChooseOrganization &&
        checkForEmail &&
        checkForPassword &&
        checkForConfirmPassword &&
        checkForTermsandConditions
      ) {
        setIsError(false);
        setLoader(true);

        onCallSignUp({
          variables: {
            input: {
              email: email,
              organizationId: chooseOrganizationId,
              newPassword: newPassword,
              confirmPassword: confirmPassword,
            },
          },
          onCompleted: async data => {
            setLoader(false);
            const {status, message, otp} = data?.registerEmployee ?? '';
            console.log('Message', message);

            if (status) {
              console.log('message::::::::::', message);

              // dispatch(
              //   Actions.errorMessage({
              //     errorMessage: message,
              //     status: true,
              //     errorType: ModalErrorType.Success,
              //   }),
              // );

              setLoader(false);
              setSuccessModal(true);
            } else {
              setLoader(false);
              dispatch(
                Actions.errorMessage({
                  errorMessage: message,
                  status: true,
                  errorType: ModalErrorType.Warning,
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
                errorType: ModalErrorType.Warning,
              }),
            );
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
      <View style={styles.buttonContainer}>
        <CommonButton
          loading={loader}
          title={String.REGISTER}
          onPress={(): void => {
            !loader && handleSignUp();
          }}
        />
      </View>
    );
  };
  const renderTermsandConditions = (): React.JSX.Element => {
    const checkForTerms: boolean = !checkbox && isError;

    return (
      <Pressable
        style={[styles.loginPagetermsandConditionButton, {marginVertical: 10}]}
        onPress={() => {
          setCheckbox(!checkbox);
          setIsError(!isError);
        }}>
        <View style={{flex: 0.1, alignItems: 'center'}}>
          <VectorIcons
            name={checkbox ? 'checkbox-marked' : 'checkbox-blank-outline'}
            type="materialCommunity"
            color={checkForTerms ? COLORS.errorRed : COLORS.primaryColor}
            size={20}
          />
        </View>
        <View style={{flex: 0.9, justifyContent: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[
                styles.andText,
                {color: checkForTerms ? COLORS.errorRed : COLORS.grey},
              ]}>
              {String.I_ACCEPT}
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate(String.TERMS_AND_CONDITION, {
                  terms: true,
                  hideHeader: !true,
                })
              }>
              <Text
                style={[
                  styles.logintermsText,
                  {
                    color: checkForTerms
                      ? COLORS.errorRed
                      : COLORS.secondaryColor,
                  },
                ]}>
                {String.PRIVACY_BUTTON_TEXT}
              </Text>
            </Pressable>
            <Text
              style={[
                styles.loginandText,
                {color: checkForTerms ? COLORS.errorRed : COLORS.grey},
              ]}>
              {String.AND}
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate(String.TERMS_AND_CONDITION, {
                  terms: !true,
                  hideHeader: !true,
                })
              }>
              <Text
                style={[
                  styles.logintermsText,
                  {
                    color: checkForTerms
                      ? COLORS.errorRed
                      : COLORS.secondaryColor,
                  },
                ]}>
                {String.PRIVACY_BUTTON_TEXT2}
              </Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    );
  };
  const onPressAccoutCreated = () => {
    setSuccessModal(false);
    navigation.navigate(String.lOG_IN);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ErrorModal
        modalVisible={successModal}
        errorType={ModalErrorType.Success}
        title={'Account Created Successfully'}
        onOkPress={onPressAccoutCreated}
      />
      {!loading ? (
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode={'on-drag'}
          behavior={Functions.isAndroid ? 'height' : 'padding'}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <ImageBackground
            source={SignUpImages.authBgImage}
            style={styles.loginImgBg}
            resizeMode={String.COVER}>
            {renderWelcome()}
            <View style={{marginTop: RFPercentage(20.0)}}>{renderInput()}</View>
            {renderTermsandConditions()}
            {renderLogin()}
            {renderButton()}
          </ImageBackground>
        </KeyboardAwareScrollView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SignUp;
const pickerStyle = StyleSheet.create({
  inputAndroid: {
    ...FONTS.l1,
    marginLeft: moderateScale(14),
    fontSize: 13,
    fontFamily: Fonts.Medium,
    color: COLORS.blackColor,
  },
  inputIOS: {},
});
