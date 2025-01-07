import {useMutation, useQuery} from '@apollo/client';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {ADMIN_UPDATE_USER_DETAILS} from '../../api/mutation';
import {GET_ADMIN_USER_DETAILS} from '../../api/query';
import {AdminHeader} from '../../components/adminComponents';
import AuthTextInput from '../../components/authTextInput';
import CommonButton from '../../components/commonButton';
import ImageViewer from '../../components/imageViewer';
import ErrorModal from '../../components/modal/errorModal';
import {ModalErrorType} from '../../constants/enums';
import * as Interfaces from '../../constants/interfaces';
import * as String from '../../constants/string';
import {COLORS} from '../../constants/theme';
import * as Actions from '../../redux/actions/actions';
import {Styles} from '../../styles/adminEditProfileStyles';
import * as Functions from '../../utlis/functions';
import {isIos} from '../../utlis/functions';

const AdminEditProfile: React.FC<{}> = (props: any) => {
  //Props variables
  const {navigation} = props;
  const dispatch = useDispatch();

  //useState variables
  const [firstName, setFirstName] = useState<string>('');
  const [successmodal, setSuccessModal] = useState(false);
  const [lastName, setLastName] = useState<string>('');
  const [companyAddress, setCompanyAddress] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [companyWebsite, setCompanyWebsite] = useState<string>('');
  const [noOfEmployees, setNoOfEmployees] = useState<string>('');
  const [workingHours, setWorkingHours] = useState<string>('');
  const [workingDays, setWorkingDays] = useState<string>('');
  const [dateOfIncorporation, setDateOfIncorporation] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const [imagePayLoadData, setImagePayLoadData] =
    useState<Interfaces.FileDataInterface>();
  const [imageViewerData, setImageViewerData] =
    useState<null | Interfaces.ImageViewerDataInterface>(null);

  const profile = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.ProfileUrl,
  );

  const mobileUserData = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.mobileUserData,
  );

  const muthalName = mobileUserData?.user?.firstName ?? '';
  const LastName = mobileUserData?.user?.lastName ?? '';
  const fullName = [muthalName, LastName].join(' ');
  const profileImage = mobileUserData?.user?.profile ?? '';

  //mutation
  const [onCallUpdateUserDetails] = useMutation(ADMIN_UPDATE_USER_DETAILS);

  //Query
  const {data, refetch} = useQuery(GET_ADMIN_USER_DETAILS);

  //Others variables
  const userFirstName: string =
    data?.getMobileUserLoginData?.user.firstName ?? '';
  const userLastname: string =
    data?.getMobileUserLoginData?.user.lastName ?? '';
  const userEmail: string = data?.getMobileUserLoginData?.user.email ?? '';
  const userMobileNumber: string =
    data?.getMobileUserLoginData?.user.contactOwner ?? '';
  const checkForImageViewer: boolean =
    Boolean(imageViewerData) &&
    Object.keys({...imageViewerData}).length > String.ZERO;
  const checkForMobileNumber: boolean =
    Boolean(mobileNumber) &&
    !Functions.handleMobileNumberRegExp(mobileNumber) &&
    mobileNumber !== userMobileNumber;

  // Hooks Functions
  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      loadUseStates();

      return (): void => {
        isFocus = false;
      };
    }, [userFirstName, userEmail, userLastname, userMobileNumber]),
  );

  // Functions
  const loadUseStates = (): void => {
    setFirstName(userFirstName);

    setEmail(userEmail);

    setLastName(userLastname);

    setMobileNumber(userMobileNumber);
  };
  const renderImageViewer = (): React.JSX.Element => {
    return (
      <ImageViewer
        data={imageViewerData}
        onBackdropPress={(): void => {
          setImageViewerData(null);
        }}
        isVisible={checkForImageViewer}
        children={undefined}
        animationIn={'bounce'}
        animationInTiming={0}
        animationOut={'bounce'}
        animationOutTiming={0}
        avoidKeyboard={false}
        coverScreen={false}
        hasBackdrop={false}
        backdropColor={''}
        backdropOpacity={0}
        backdropTransitionInTiming={0}
        backdropTransitionOutTiming={0}
        customBackdrop={undefined}
        useNativeDriver={false}
        deviceHeight={null}
        deviceWidth={null}
        hideModalContentWhileAnimating={false}
        propagateSwipe={false}
        panResponderThreshold={0}
        swipeThreshold={0}
        onModalShow={function (): void {
          throw new Error('Function not implemented.');
        }}
        onModalWillShow={function (): void {
          throw new Error('Function not implemented.');
        }}
        onModalHide={function (): void {
          throw new Error('Function not implemented.');
        }}
        onModalWillHide={function (): void {
          throw new Error('Function not implemented.');
        }}
        onBackButtonPress={function (): void {
          throw new Error('Function not implemented.');
        }}
        scrollTo={null}
        scrollOffset={0}
        scrollOffsetMax={0}
        scrollHorizontal={false}
        statusBarTranslucent={false}
        supportedOrientations={[]}
      />
    );
  };

  //UI functions
  const renderFirstName = (): React.JSX.Element => {
    const checkForFirstNameEmpty: boolean = !firstName && isError;
    const checkForFirstNameError: boolean = checkForFirstNameEmpty;
    return (
      <AuthTextInput
        editable={false}
        label={String.FIRST_NAME}
        keyboardType={String.TI_KT_DEFAULT}
        placeholder={String.ENTER_FIRST_NAME}
        onChangeText={(txt: string): void => {
          setFirstName(txt);
        }}
        error={checkForFirstNameError}
        errorText="first name is required"
        value={firstName}
      />
    );
  };

  const renderLastName = (): React.JSX.Element => {
    const checkForLastNameEmpty: boolean = !lastName && isError;
    const checkForLastNameError: boolean = checkForLastNameEmpty;
    return (
      <AuthTextInput
        editable={false}
        label={String.LAST_NAME}
        keyboardType={String.TI_KT_DEFAULT}
        placeholder={String.ENTER_LAST_NAME}
        onChangeText={(txt: string): void => {
          setLastName(txt);
        }}
        error={checkForLastNameError}
        errorText="Last name is required"
        value={lastName}
      />
    );
  };

  const renderCompanyAddress = (): React.JSX.Element => {
    const checkForCompnayAddressEmpty: boolean = !companyAddress && isError;
    const checkForCompanyAddressError: boolean = checkForCompnayAddressEmpty;

    return (
      <AuthTextInput
        label={String.COMPANY_ADDRESS}
        placeholder={String.ENTER_COMPANY_ADDRESS}
        error={checkForCompanyAddressError}
        keyboardType={String.TI_KT_DEFAULT}
        errorText={'Company name is required'}
        onChangeText={(txt: string): void => {
          setCompanyAddress(txt);
        }}
        value={companyAddress}
      />
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
        editable={false}
        label={String.EMAIL_ID}
        placeholder={String.ENTER_EMAIL_ID}
        keyboardType={String.TI_KT_EMAIL_ADDRESS}
        onChangeText={(txt: string): void => {
          setEmail(txt);
        }}
        error={checkForEmailError}
        errorText={
          checkForValidEmail
            ? String.EMAIL_IS_INVALID
            : String.EMAIL_IS_REQUIRED
        }
        value={email}
      />
    );
  };

  const renderMobileNumber = (): React.JSX.Element => {
    const checkForMobileNumberEmpty: boolean = !mobileNumber && isError;
    const checkForValidMobileNumber: boolean =
      Boolean(email) && Functions.handleMobileNumberRegExp(mobileNumber);
    const checkForMobileNumberError: boolean =
      checkForMobileNumberEmpty || checkForValidMobileNumber;
    return (
      <AuthTextInput
        editable={false}
        label={String.MOBILE_NUMBER}
        placeholder={String.ENTER_MOBILE_NUMBER}
        value={mobileNumber}
        maxLength={String.TEN}
        keyboardType={String.TI_KT_NUMBER_PAD}
        error={checkForMobileNumberError}
        errorText={
          checkForValidMobileNumber
            ? String.MOBILE_NUMBER_INVALID
            : String.MOBILE_NUMBER_IS_REQUIRED
        }
        onChangeText={(txt: string): void => {
          setMobileNumber(txt);
        }}
      />
    );
  };

  const renderCompanyWebsite = (): React.JSX.Element => {
    const checkForCompanyWebisteEmpty: boolean = !companyWebsite && isError;
    const checkForCompanyWebsiteError: boolean = checkForCompanyWebisteEmpty;
    return (
      <AuthTextInput
        label={String.COMPANY_WEBSITE}
        placeholder={String.ENTER_COMPANY_WEBSITE}
        error={checkForCompanyWebsiteError}
        keyboardType={String.TI_KT_DEFAULT}
        errorText={'Company Website is required'}
        onChangeText={(txt: string): void => {
          setCompanyWebsite(txt);
        }}
        value={companyWebsite}
      />
    );
  };

  const renderNoOfEmployees = (): React.JSX.Element => {
    const checkForNoOfEmployeesEmpty: boolean = !companyWebsite && isError;
    const checkForNoOfEmployeesError: boolean = checkForNoOfEmployeesEmpty;
    return (
      <AuthTextInput
        label={String.NO_OF_EMPLOYEES}
        placeholder={String.ENTER_NO_OF_EMPLOYEES}
        keyboardType={String.TI_KT_NUMBER_PAD}
        error={checkForNoOfEmployeesError}
        errorText={'No of Employees is required'}
        onChangeText={(txt: string): void => {
          setNoOfEmployees(txt);
        }}
        value={noOfEmployees}
      />
    );
  };

  const renderWorkingHours = (): React.JSX.Element => {
    const checkForWorkingHoursEmpty: boolean = !workingHours && isError;
    const checkForWorkingHoursError: boolean = checkForWorkingHoursEmpty;
    return (
      <AuthTextInput
        label={String.WORKING_HOURS}
        placeholder={String.ENTER_WORKING_HOURS}
        keyboardType={String.TI_KT_NUMBER_PAD}
        error={checkForWorkingHoursError}
        errorText={'Working hours is required'}
        onChangeText={(txt: string): void => {
          setWorkingHours(txt);
        }}
        value={workingHours}
      />
    );
  };

  const renderWorkingDays = (): React.JSX.Element => {
    const checkForWorkingDaysEmpty: boolean = !workingDays && isError;
    const checkForWorkingDaysError: boolean = checkForWorkingDaysEmpty;
    return (
      <AuthTextInput
        label={String.WORKING_DAYS}
        placeholder={String.ENTER_WORKING_DAYS}
        keyboardType={String.TI_KT_NUMBER_PAD}
        error={checkForWorkingDaysError}
        errorText={'Working days is required'}
        onChangeText={(txt: string): void => {
          setWorkingDays(txt);
        }}
        value={workingDays}
      />
    );
  };

  const renderDateOfIncorporation = (): React.JSX.Element => {
    const checkForDateOfIncorporationEmpty: boolean =
      !dateOfIncorporation && isError;
    const checkForDateOfIncorporationError: boolean =
      checkForDateOfIncorporationEmpty;
    return (
      <AuthTextInput
        label={String.DATE_OF_INCORPORATION}
        placeholder={String.ENTER_DATE_OF_INCORPORATION}
        keyboardType={String.TI_KT_NUMBER_PAD}
        error={checkForDateOfIncorporationError}
        errorText={'Date of incorporation is required'}
        onChangeText={(txt: string): void => {
          setDateOfIncorporation(txt);
        }}
        value={dateOfIncorporation}
      />
    );
  };

  const renderSaveButton = (): React.JSX.Element => {
    const handleSave = (): void => {
      const checkForFirstName: boolean = Boolean(firstName);
      const checkForLastName: boolean = Boolean(lastName);
      const checkForCompanyAddress: boolean = Boolean(companyAddress);
      const checkForEmail: boolean =
        Boolean(email) && !Functions.handleEmailRegExp(email);

      const checkForMobileNumber: boolean =
        Boolean(mobileNumber) &&
        !Functions.handleMobileNumberRegExp(mobileNumber) &&
        mobileNumber !== userMobileNumber;

      const checkForCompanyWebsite: boolean = Boolean(companyWebsite);
      const checkForNoOfEmployees: boolean = Boolean(noOfEmployees);
      const checkForWorkingHours: boolean = Boolean(workingHours);
      const checkForWorkingDays: boolean = Boolean(workingDays);
      const checkForDateOfIncorporation: boolean = Boolean(dateOfIncorporation);
      // navigation.goBack();/

      if (
        // checkForFirstName &&
        // checkForLastName &&
        // checkForEmail &&
        imagePayLoadData
        // checkForCompanyWebsite &&
        // checkForNoOfEmployees &&
        // checkForCompanyAddress &&
        // checkForWorkingHours &&
        // checkForWorkingDays &&
        // checkForDateOfIncorporation
      ) {
        setIsError(false);
        setLoader(true);
        console.log('EDIT PROFILE REQUEST DATA', {
          variables: {
            input: {
              contact: mobileNumber,
              profile: JSON.stringify(imagePayLoadData),
            },
          },
        });

        onCallUpdateUserDetails({
          variables: {
            input: {
              contact: mobileNumber,
              profile: imagePayLoadData,
            },
          },
          onCompleted: async data => {
            setLoader(false);
            const {status, message, otp} = data?.updateAdminProfile ?? '';
            if (status) {
              refetch();
              setSuccessModal(true);
              setLoader(false);
            } else {
              setLoader(false);
            }
          },

          onError: error => {
            setLoader(false);
            dispatch(
              Actions.errorMessage({
                errorMessage: String.COMMON_ERROR,
                status: true,
                errorType: ModalErrorType.Error,
              }),
            );
          },
        });
      } else {
        dispatch(
          Actions.errorMessage({
            errorMessage: 'Please change profile image',
            status: true,
            errorType: ModalErrorType.Info,
          }),
        );
      }
    };

    return (
      <View style={{marginVertical: moderateScale(20)}}>
        <CommonButton
          // disableButton={!checkForMobileNumber}
          // linearBackground={['#EF9F7B', '#EF9F7B']}
          title="Save"
          loading={loader}
          onPress={() => {
            !loader && handleSave();
          }}
        />
      </View>
    );
  };

  const renderProfile = (): React.JSX.Element => {
    return (
      <View style={Styles.profileCenter}>
        <Pressable
          // disabled={true}
          style={Styles.changeProfileContainer}
          // onPress={(): void => {
          //   const imageViewerData: Interfaces.ImageViewerDataInterface = {
          //     type: String.PNG,
          //     uri: imageUrl ? imageUrl : profileImage,
          //   };
          //   setImageViewerData(imageViewerData);
          // }}
        >
          {profileImage || imageUrl ? (
            <>
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                source={{
                  uri: imageUrl ? imageUrl : profileImage,
                  priority: FastImage.priority.high,
                  cache: 'immutable',
                }}
                style={{height: '100%', width: '100%', borderRadius: 60}}
              />
            </>
          ) : (
            <Text
              style={{
                color: COLORS.whiteColor,
                fontWeight: 'bold',
                fontSize: 30,
              }}>
              {Functions.acronym(fullName)}
            </Text>
          )}
        </Pressable>
      </View>
    );
  };

  const renderChangeProfileImage = (): React.JSX.Element => {
    const imagePickerConfigs: any = {
      cropperCircleOverlay: true,
    };

    const requestCameraPermission = async () => {
      try {
        Functions.openGallery(
          imagePickerConfigs,
          (fileData: Interfaces.FileDataInterface) => {
            console.log('DP FILE DATA::: ', fileData);
            const FileData = fileData;
            setImageUrl(fileData?.uri ?? '');

            setImagePayLoadData({
              name: FileData.name,
              type: FileData.type,
              uri: FileData.file.data,
            });
          },
        );
      } catch (err) {
        console.warn(err);
      }
    };
    return (
      <View style={Styles.textContainer}>
        <Text
          onPress={() => {
            requestCameraPermission();
          }}
          style={Styles.t1}>
          {String.CHANGE_PROFILE_IMAGE}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={Styles.container}>
      <AdminHeader back={true} />
      <ErrorModal
        modalVisible={successmodal}
        errorType={ModalErrorType.Success}
        title={'Profile Updated Successfully'}
        onOkPress={() => {
          navigation.navigate('AdminHomeStack');
        }}
      />
      <View style={Styles.subContainer}>
        {renderProfile()}
        {renderChangeProfileImage()}
        <KeyboardAwareScrollView
          style={Styles.Scrollcontainer}
          enableOnAndroid={true}
          keyboardShouldPersistTaps={'handled'}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          {renderFirstName()}
          {renderLastName()}
          {renderEmail()}
          {renderMobileNumber()}
          {/* {renderCompanyAddress()} */}
          {/* {renderCompanyWebsite()} */}
          {/* {renderNoOfEmployees()} */}
          {/* {renderWorkingHours()} */}
          {/* {renderWorkingDays()} */}
          {/* {renderDateOfIncorporation()} */}
          {renderSaveButton()}
        </KeyboardAwareScrollView>
        {renderImageViewer()}
      </View>
      {isIos && (
        <View
          style={{
            backgroundColor: COLORS.DashboardBackgroundColor,
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            height: 100,
            zIndex: -1000,
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default AdminEditProfile;
