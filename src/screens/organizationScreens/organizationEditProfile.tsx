import {useMutation} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
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
import ImageViewer from '../../components/imageViewer';
import ErrorModal from '../../components/modal/errorModal';
import {
  OrganizationHeader,
  OrganizationSubHeader,
} from '../../components/organizationComponents';
import EmployeeEditProfileLoader from '../../components/skeletonLoader/employeeEditProfileLoader';
import {ModalErrorType} from '../../constants/enums';
import * as Interfaces from '../../constants/interfaces';
import * as String from '../../constants/string';
import {COLORS, Fonts} from '../../constants/theme';
import * as Actions from '../../redux/actions/actions';
import {Styles} from '../../styles/organizationEditprofleStyles';
import * as Functions from '../../utlis/functions';

const OrganizationEditProfile: React.FC<{}> = (props: any) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  //useState variables
  const [companyName, setCompanyName] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [companyAddress, setCompanyAddress] = useState<string>('');
  const [imageLoading, setImageLoading] = useState(true); // State to track loading
  const [email, setEmail] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [companyWebsite, setCompanyWebsite] = useState<string>('');
  const [noOfEmployees, setNoOfEmployees] = useState<string>('');
  const [workingHours, setWorkingHours] = useState<string>('');
  const [workingDays, setWorkingDays] = useState<string>('');
  const [dateOfIncorporation, setDateOfIncorporation] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(true);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [successmodal, setSuccessModal] = useState(false);
  const [imagePayLoadData, setImagePayLoadData] =
    useState<Interfaces.FileDataInterface>();

  const getOrganizationDetails = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.getOrganizationDetails,
  );

  const organizationProfile =
    getOrganizationDetails?.company_logo?.[0]?.file ?? '';

  const profile = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.ProfileUrl,
  );

  const organizationName: string = getOrganizationDetails?.org_name ?? '';
  const organizationClientName: string =
    getOrganizationDetails?.founders_name?.[0] ?? '';
  const organizationEmail: string = getOrganizationDetails?.email ?? '';
  const organizationContact: string =
    getOrganizationDetails?.contact?.[0] ?? '';
  const organizationAddress1: string =
    getOrganizationDetails?.address_1st_line ?? '';
  const organizationAddress2: string =
    getOrganizationDetails?.address_2nd_line ?? '';
  const organizationCity: string = getOrganizationDetails?.city ?? '';
  const organizationCountry: string = getOrganizationDetails?.country ?? '';
  const organizationPostCode: string = getOrganizationDetails?.post_code ?? '';

  const organizationCompanyAddress: string = [
    organizationAddress1,
    organizationAddress2,
    organizationCity,
    organizationCountry,
    organizationPostCode,
  ]?.join(', ');

  const organizationWebsite: string = getOrganizationDetails?.website ?? '';
  const organizationNoOfEmployees: string =
    getOrganizationDetails?.no_of_employees ?? '';

  useEffect(() => {
    setCompanyName(organizationName);
    setClientName(organizationClientName);
    setCompanyAddress(organizationCompanyAddress);
    setEmail(organizationEmail);
    setMobileNumber(organizationContact);
    setNoOfEmployees(organizationNoOfEmployees);
    setCompanyWebsite(organizationWebsite);

    if (getOrganizationDetails) {
      dispatch(Actions.gettingOrganizationDetails(getOrganizationDetails));
    }
  }, []);

  //mutation
  const [onCallUpdateUserDetails] = useMutation(ADMIN_UPDATE_USER_DETAILS);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  });

  const [imageViewerData, setImageViewerData] =
    useState<null | Interfaces.ImageViewerDataInterface>(null);

  const checkForImageViewer: boolean =
    Boolean(imageViewerData) &&
    Object.keys({...imageViewerData}).length > String.ZERO;

  const renderProfile = (): React.JSX.Element => {
    return (
      <View style={Styles.profile}>
        <View style={Styles.profileContainer}>
          {loader ? (
            <ActivityIndicator
              color={'white'}
              size={'small'}
              style={{position: 'absolute'}}
            />
          ) : (
            <>
              {organizationProfile ? (
                <>
                  <FastImage
                    onLoadStart={() => setImageLoading(true)}
                    onLoadEnd={() => setImageLoading(false)}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{
                      uri: organizationProfile,
                      priority: FastImage.priority.high,
                      cache: 'immutable',
                    }}
                    style={Styles.imageStyle}
                  />
                  {imageLoading && (
                    <ActivityIndicator
                      color={'white'}
                      size={'small'}
                      style={{position: 'absolute'}}
                    />
                  )}
                </>
              ) : (
                <Text
                  style={{
                    color: COLORS.whiteColor,
                    fontFamily: Fonts.SemiBold,
                    paddingTop: 5,
                    fontSize: 22,
                  }}>
                  {Functions.acronym((global as any).orgName)}
                </Text>
              )}
            </>
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
        <Text style={Styles.name}>{(global as any).orgName}</Text>
        <Text style={Styles.email}>{(global as any).org_email}</Text>
      </View>
    );
  };

  const renderChangeProfile = (): React.JSX.Element => {
    const imagePickerConfigs: any = {
      cropperCircleOverlay: true,
    };

    const requestCameraPermission = async () => {
      try {
        Functions.openGallery(
          imagePickerConfigs,
          (fileData: Interfaces.FileDataInterface) => {
            console.log('DP FILE DATA::: ', fileData.uri);
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
            {organizationProfile || imageUrl ? (
              <>
                <FastImage
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    uri: imageUrl ? imageUrl : organizationProfile,
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
                  fontFamily: Fonts.SemiBold,
                  paddingTop: 5,
                  fontSize: 30,
                }}>
                {Functions.acronym((global as any).orgName)}
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

  const renderCompanyName = (): React.JSX.Element => {
    const checkForCompanyNameEmpty: boolean = !companyName && isError;
    const checkForCompanyNameError: boolean = checkForCompanyNameEmpty;
    return (
      <AuthTextInput
        editable={false}
        label={String.COMPANY_NAME}
        keyboardType={String.TI_KT_DEFAULT}
        placeholder={String.ENTER_COMPANY_NAME}
        onChangeText={(txt: string): void => {
          setCompanyName(txt);
        }}
        error={checkForCompanyNameError}
        errorText="Company name is required"
        value={companyName}
      />
    );
  };

  const renderClientName = (): React.JSX.Element => {
    const checkForClientNameEmpty: boolean = !clientName && isError;
    const checkForClientNameError: boolean = checkForClientNameEmpty;
    return (
      <AuthTextInput
        editable={false}
        label={String.CLIENT_NAME}
        keyboardType={String.TI_KT_DEFAULT}
        placeholder={String.ENTER_CLIENT_NAME}
        onChangeText={(txt: string): void => {
          setClientName(txt);
        }}
        error={checkForClientNameError}
        errorText="Client name is required"
        value={clientName}
      />
    );
  };

  const renderCompanyAddress = (): React.JSX.Element => {
    const checkForCompnayAddressEmpty: boolean = !companyAddress && isError;
    const checkForCompanyAddressError: boolean = checkForCompnayAddressEmpty;

    return (
      <AuthTextInput
        multiline={true}
        editable={false}
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
    const checkForMobileNumberError: boolean = checkForMobileNumberEmpty;
    return (
      <AuthTextInput
        editable={false}
        label={String.MOBILE_NUMBER}
        placeholder={String.ENTER_MOBILE_NUMBER}
        value={mobileNumber}
        maxLength={String.TEN}
        keyboardType={String.TI_KT_NUMBER_PAD}
        error={checkForMobileNumberError}
        errorText={'Mobile number is required'}
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
        multiline={true}
        editable={false}
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
        editable={false}
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
        editable={false}
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
        editable={false}
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
        editable={false}
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
      const checkForCompanyName: boolean = Boolean(companyName);
      const checkForClientName: boolean = Boolean(clientName);
      const checkForCompanyAddress: boolean = Boolean(companyAddress);
      const checkForEmail: boolean =
        Boolean(email) && !Functions.handleEmailRegExp(email);
      const checkForMobileNumber: boolean = Boolean(mobileNumber);
      const checkForCompanyWebsite: boolean = Boolean(companyWebsite);
      const checkForNoOfEmployees: boolean = Boolean(noOfEmployees);
      const checkForWorkingHours: boolean = Boolean(workingHours);
      const checkForWorkingDays: boolean = Boolean(workingDays);
      const checkForDateOfIncorporation: boolean = Boolean(dateOfIncorporation);
      if (imagePayLoadData) {
        setIsError(false);
        setButtonLoader(true);

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
            const {status, message, otp} = data?.updateAdminProfile ?? '';
            if (status) {
              setButtonLoader(false);
              setSuccessModal(true);
            } else {
              setButtonLoader(false);
            }
          },

          onError: error => {
            setButtonLoader(false);
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
    <SafeAreaView style={[Styles.container]}>
      <View style={{flex: 1, backgroundColor: COLORS.DashboardBackgroundColor}}>
        <OrganizationHeader title="Edit Profile" showBackArrow={true} />
        <OrganizationSubHeader />
        <ErrorModal
          modalVisible={successmodal}
          errorType={ModalErrorType.Success}
          title={'Profile Updated Successfully'}
          onOkPress={() => {
            setSuccessModal(false);
            navigation.navigate('OrganizationHomeStack');
          }}
        />
        {!loader ? (
          <ScrollView
            style={styles.Scrollcontainer}
            showsVerticalScrollIndicator={false}>
            <View style={Styles.topHeader}>
              {renderProfile()}
              {renderNameEmail()}
            </View>
            {renderDivider()}
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              style={{backgroundColor: COLORS.DashboardBackgroundColor}}
              keyboardShouldPersistTaps={'handled'}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}>
              {renderChangeProfile()}
              {renderCompanyName()}
              {renderClientName()}
              {renderEmail()}
              {renderMobileNumber()}
              {renderCompanyAddress()}
              {renderCompanyWebsite()}
              {renderNoOfEmployees()}
              {/* {renderWorkingHours()} */}
              {/* {renderWorkingDays()} */}
              {/* {renderDateOfIncorporation()} */}
              {renderSaveButton()}
            </KeyboardAwareScrollView>
            {renderImageViewer()}
          </ScrollView>
        ) : (
          <EmployeeEditProfileLoader />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Scrollcontainer: {
    marginHorizontal: moderateScale(25),
    backgroundColor: COLORS.DashboardBackgroundColor,
    marginBottom: moderateScale(100),
  },
});

export default OrganizationEditProfile;
