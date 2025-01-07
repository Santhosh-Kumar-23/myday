import {useMutation} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {ADMIN_UPDATE_USER_DETAILS} from '../../api/mutation';
import AuthTextInput from '../../components/authTextInput';
import CommonButton from '../../components/commonButton';
import {EmployeeSettingsSubHeader} from '../../components/employeeComponents/employeeSettingsSubHeader';
import ImageViewer from '../../components/imageViewer';
import ErrorModal from '../../components/modal/errorModal';
import EditProfileLoader from '../../components/skeletonLoader/employeeEditProfileLoader';
import {ModalErrorType} from '../../constants/enums';
import * as Interfaces from '../../constants/interfaces';
import {getUserInformation} from '../../constants/localStorage';
import * as String from '../../constants/string';
import {COLORS, Fonts} from '../../constants/theme';
import * as Actions from '../../redux/actions/actions';
import {Styles} from '../../styles/employeeEditprofleStyles';
import * as Functions from '../../utlis/functions';

const EmployeeEditProfile: React.FC<{}> = (props: any) => {
  const {navigation} = props;
  const [successmodal, setSuccessModal] = useState(false);

  const dispatch = useDispatch();

  //mutation
  const [onCallUpdateUserDetails] = useMutation(ADMIN_UPDATE_USER_DETAILS);

  //Query
  // const {data, refetch} = useQuery(GET_ADMIN_USER_DETAILS);

  // console.log('AAAAAAAAAAAAAAAAAAAA::::::::', data.getMobileUserLoginData);

  //useState variables
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [Aadhaar, setAadhaar] = useState<string>('');
  const [PAN, setPAN] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(true);
  const [userID, setUserId] = useState<string>('');
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);

  const getEmployeeDetails = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.getEmployeeDetails,
  );

  const [imagePayLoadData, setImagePayLoadData] =
    useState<Interfaces.FileDataInterface>();
  const employeeFirstName: string = getEmployeeDetails?.first_name ?? '';
  const employeeEmail: string = getEmployeeDetails?.email ?? '';
  const employeeLastName: string = getEmployeeDetails?.last_name ?? '';
  const employeeFullName: string = [employeeFirstName, employeeLastName].join(
    ' ',
  );
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const employeeDOB: string = Functions.profileDateConverter(
    getEmployeeDetails?.dob ?? '',
  );
  const aadhaarNumber: string =
    getEmployeeDetails?.employeeKYC?.aadharNumber ?? '-';
  const panNumber: string = getEmployeeDetails?.employeeKYC?.panNumber ?? '-';
  const employeeContactNumber: string =
    getEmployeeDetails?.contact_number?.phones?.[0]?.number ?? '';
  const employeeDesignation: string = getEmployeeDetails?.job_title ?? '';
  const employeeOrgnaizationName: string = getEmployeeDetails?.org_name ?? '';

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  });

  useEffect(() => {
    setFirstName(employeeFirstName);
    setLastName(employeeLastName);
    setDob(employeeDOB);
    setEmail(employeeEmail);
    setMobileNumber(employeeContactNumber);
    setDesignation(employeeDesignation);
    setOrganization(employeeOrgnaizationName);
    setAadhaar(aadhaarNumber);
    setPAN(panNumber);
    if (getEmployeeDetails) {
      dispatch(Actions.gettingEmployeeDetails(getEmployeeDetails));
    }
  }, []);
  useEffect(() => {
    getUserInformation()
      .then((data: any) => {
        console.log('GET_USER_INFORMATION:', data);
        setUserId(data?.userId);
      })
      .catch(error => {
        console.log('GET_USER_INFORMATION ERROR:', error);
      });
  }, []);

  const [imageViewerData, setImageViewerData] =
    useState<null | Interfaces.ImageViewerDataInterface>(null);

  const checkForImageViewer: boolean =
    Boolean(imageViewerData) &&
    Object.keys({...imageViewerData}).length > String.ZERO;

  const renderProfile = (): React.JSX.Element => {
    return (
      <View style={Styles.profile}>
        <View style={Styles.profileContainer}>
          {imageLoading && (
            <ActivityIndicator
              size={'small'}
              style={{position: 'absolute'}}
              color={'white'}
            />
          )}
          {getEmployeeDetails?.profile ? (
            <FastImage
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
              source={{
                uri: getEmployeeDetails?.profile,
                priority: FastImage.priority.high,
              }}
              style={Styles.imageStyle}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <Text
              style={{
                color: COLORS.whiteColor,
                fontSize: 18,
                marginTop: 5,
                fontFamily: Fonts.SemiBold,
              }}>
              {Functions.acronym(employeeFullName)}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const renderImageViewer = (): React.JSX.Element => {
    return (
      <ImageViewer
        data={imageViewerData}
        onBackdropPress={(): void => {
          setImageViewerData(null);
        }}
        isVisible={checkForImageViewer}
      />
    );
  };

  const renderDivider = (): React.JSX.Element => {
    return <View style={[Styles.dividerStyle]}></View>;
  };

  const renderNameEmail = (): React.JSX.Element => {
    return (
      <View style={Styles.emailContainer}>
        <Text style={Styles.name}>
          {String.HELLO} {employeeFirstName},
        </Text>
        <Text style={Styles.email}>{employeeEmail}</Text>
      </View>
    );
  };

  console.log('IMAGEURL::::::::::', imageUrl);

  const renderChangeProfile = (): React.JSX.Element => {
    const imagePickerConfigs: any = {
      cropperCircleOverlay: true,
    };

    const requestCameraPermission = async () => {
      try {
        Functions.openGallery(
          imagePickerConfigs,
          (fileData: Interfaces.FileDataInterface) => {
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
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Pressable
          // disabled={!imageUrl}
          style={Styles.changeProfileContainer}
          // onPress={(): void => {
          //   const imageViewerData: Interfaces.ImageViewerDataInterface = {
          //     type: String.PNG,
          //     uri: imageUrl,
          //   };

          //   setImageViewerData(imageViewerData);
          // }}
        >
          <View
            style={{
              height: moderateScale(85),
              width: moderateScale(85),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {imageLoading && (
              <ActivityIndicator
                style={{position: 'absolute'}}
                size={'small'}
                color={COLORS.whiteColor}
              />
            )}
            {getEmployeeDetails?.profile || imageUrl ? (
              <>
                <FastImage
                  onLoadStart={() => setImageLoading(true)}
                  onLoadEnd={() => setImageLoading(false)}
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    uri: imageUrl ? imageUrl : getEmployeeDetails?.profile,
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
                  fontSize: 30,
                  marginTop: 10,
                  fontFamily: Fonts.SemiBold,
                }}>
                {Functions.acronym(employeeFullName)}
              </Text>
            )}
          </View>
        </Pressable>

        <Text
          style={Styles.chnageProfileImageText}
          onPress={() => {
            requestCameraPermission();
          }}>
          {String.CHANGE_PROFILE_IMAGE}
        </Text>
      </View>
    );
  };

  const renderFirstName = (): React.JSX.Element => {
    const checkForFirstNameEmpty: boolean = !firstName && isError;
    const checkForFirstNameError: boolean = checkForFirstNameEmpty;
    return (
      <AuthTextInput
        label={String.FIRST_NAME}
        placeholder={String.ENTER_FIRST_NAME}
        onChangeText={(txt: string): void => {
          setFirstName(txt);
        }}
        editable={false}
        error={checkForFirstNameError}
        errorText="First name is required"
        value={firstName}
      />
    );
  };

  const renderLastName = (): React.JSX.Element => {
    const checkForLastNameEmpty: boolean = !lastName && isError;
    const checkForLastNameError: boolean = checkForLastNameEmpty;
    return (
      <AuthTextInput
        label={String.LAST_NAME}
        editable={false}
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

  const renderDob = (): React.JSX.Element => {
    const checkForDOBEmpty: boolean = !dob && isError;
    //const checkForValidDOB: boolean = Functions.handleDobValidation(dob);
    const checkForDobError: boolean = checkForDOBEmpty;
    console.log('dob::: ', checkForDobError);

    const handleFormatText = (input: string) => {
      const formatted = Functions.handleDob(input, dob.length > input.length);
      setDob(formatted);
    };

    return (
      <AuthTextInput
        label={String.DATE_OF_BIRTH}
        editable={false}
        placeholder={String.DDMMYYYY}
        error={checkForDobError}
        keyboardType={String.TI_KT_NUMBER_PAD}
        errorText={checkForDobError ? 'Dob is invalid' : 'Dob is required'}
        maxLength={String.TEN}
        onChangeText={(txt: string): void => {
          handleFormatText(txt);
        }}
        value={dob}
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
        label={String.EMAIL_ID}
        editable={false}
        placeholder={String.ENTER_EMAIL_ID}
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
    const checkForMobileNumberError: boolean = checkForMobileNumberEmpty;
    return (
      <AuthTextInput
        label={String.MOBILE_NUMBER}
        editable={false}
        placeholder={String.ENTER_MOBILE_NUMBER}
        value={mobileNumber}
        error={checkForMobileNumberError}
        errorText={'Mobile number is required'}
        onChangeText={(txt: string): void => {
          setMobileNumber(txt);
        }}
      />
    );
  };

  const renderDesignation = (): React.JSX.Element => {
    const checkForDesignationEmpty: boolean = !designation && isError;
    const checkForDesignationError: boolean = checkForDesignationEmpty;
    return (
      <AuthTextInput
        label={String.DESIGNATION}
        editable={false}
        placeholder={String.ENTER_DESIGNATION}
        error={checkForDesignationError}
        errorText={'Designation is required'}
        onChangeText={(txt: string): void => {
          setDesignation(txt);
        }}
        value={designation}
      />
    );
  };

  const renderOrganization = (): React.JSX.Element => {
    const checkForOrganizationEmpty: boolean = !designation && isError;
    const checkForOrganizationError: boolean = checkForOrganizationEmpty;
    return (
      <AuthTextInput
        label={String.ORGANIZATION_NAME}
        placeholder={String.ENTER_ORGANIZATION_NAME}
        editable={false}
        error={checkForOrganizationError}
        errorText={'Designation is required'}
        onChangeText={(txt: string): void => {
          setOrganization(txt);
        }}
        value={organization}
      />
    );
  };

  const renderAadharNumber = (): React.JSX.Element => {
    // const checkForOrganizationEmpty: boolean = !designation && isError;
    // const checkForOrganizationError: boolean = checkForOrganizationEmpty;
    return (
      <AuthTextInput
        label={String.AADHAAR_NUMBER}
        placeholder={String.ENTER_AADHAAR_NAME}
        editable={false}
        // error={checkForOrganizationError}
        errorText={'Aadhaar is required'}
        onChangeText={(txt: string): void => {
          setAadhaar(txt);
        }}
        value={Aadhaar}
      />
    );
  };

  const renderPANnumber = (): React.JSX.Element => {
    // const checkForOrganizationEmpty: boolean = !designation && isError;
    // const checkForOrganizationError: boolean = checkForOrganizationEmpty;
    return (
      <AuthTextInput
        label={String.PAN_NUMBER}
        placeholder={String.ENTER_PAN}
        editable={false}
        // error={checkForOrganizationError}
        errorText={'PAN is required'}
        onChangeText={(txt: string): void => {
          setPAN(txt);
        }}
        value={PAN}
      />
    );
  };

  const renderSaveButton = (): React.JSX.Element => {
    const handleSave = (): void => {
      const checkForFisrtName: boolean = Boolean(firstName);
      const checkForLastName: boolean = Boolean(lastName);
      const checkForDOB: boolean =
        Boolean(dob) && !Functions.handleDobValidation(dob);
      const checkForEmail: boolean =
        Boolean(email) && !Functions.handleEmailRegExp(email);
      const checkForMobileNumber: boolean = Boolean(mobileNumber);
      const checkForDesignation: boolean = Boolean(designation);
      const checkForOrganization: boolean = Boolean(organization);
      setButtonLoader(true);
      if (imagePayLoadData) {
        setIsError(false);
        setLoader(false);
        console.log('EDIT PROFILE REQUEST DATA', {
          variables: {
            input: {
              profile: JSON.stringify(imagePayLoadData),
            },
          },
        });
        onCallUpdateUserDetails({
          variables: {
            input: {
              profile: imagePayLoadData,
            },
          },
          onCompleted: async data => {
            console.log('DATAAAAAAAAAAAAAAAAA:::', data);
            setLoader(false);
            const {status, message, otp} = data?.updateAdminProfile ?? '';
            console.log('status:::::::::::::::::::::', status);

            if (status) {
              setSuccessModal(true);
              setButtonLoader(false);
              setLoader(false);
            } else {
              setLoader(false);
            }
          },

          onError: error => {
            setLoader(false);
            setButtonLoader(false);
            // Functions.handleGraphQLError(error, setLoader, String.EDIT_PROFILE);
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
        setButtonLoader(false);
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
          title="Save"
          loading={buttonLoader}
          onPress={() => {
            handleSave();
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        Styles.container,
        {backgroundColor: COLORS.DashboardBackgroundColor},
      ]}>
      <EmployeeSettingsSubHeader
        title={String.EDIT_PROFILE}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ErrorModal
        modalVisible={successmodal}
        errorType={ModalErrorType.Success}
        title={'Profile Updated Successfully'}
        onOkPress={() => {
          navigation.navigate('EmployeeHomeStack');
        }}
      />
      {!loader ? (
        <ScrollView
          style={{
            marginHorizontal: moderateScale(25),
            backgroundColor: COLORS.DashboardBackgroundColor,
          }}
          showsVerticalScrollIndicator={false}>
          <View style={Styles.topHeader}>
            {renderProfile()}
            {renderNameEmail()}
          </View>
          {renderDivider()}
          <KeyboardAwareScrollView
            style={{
              backgroundColor: COLORS.DashboardBackgroundColor,
            }}
            enableOnAndroid={true}
            keyboardShouldPersistTaps={'handled'}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            {renderChangeProfile()}
            {renderFirstName()}
            {renderLastName()}
            {renderDob()}
            {renderEmail()}
            {renderMobileNumber()}
            {renderDesignation()}
            {renderOrganization()}
            {renderAadharNumber()}
            {renderPANnumber()}
            {renderSaveButton()}
          </KeyboardAwareScrollView>
          {renderImageViewer()}
        </ScrollView>
      ) : (
        <EditProfileLoader />
      )}
    </SafeAreaView>
  );
};

export {EmployeeEditProfile};
