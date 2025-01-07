import {useMutation} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import * as mutations from '../../api/mutation';
import CommonButton from '../../components/commonButton';
import {EmployeeLoanRequestReviewCardDetails} from '../../components/employeeComponents/employeeLoanRequestReviewCardDetails';
import {EmployeeLoanRequestSubHeader} from '../../components/employeeComponents/employeeLoanRequestSubHeader';
import CancelModal from '../../components/modal/cancelModal';
import ErrorModal from '../../components/modal/errorModal';
import {EmployeeCommonLoader} from '../../components/skeletonLoader/employeeCommonLoader';
import {Elevation, ModalErrorType} from '../../constants/enums';
import * as Interfaces from '../../constants/interfaces';
import * as String from '../../constants/string';
import {COLORS, FONTS} from '../../constants/theme';
import * as Actions from '../../redux/actions/actions';
import {commonStyles} from '../../styles';
import {formatBytes, isIos, truncateText} from '../../utlis/functions';
const EmployeeLoanRequestReviewDetails = (props: any) => {
  //Props variables
  const {navigation} = props;

  //State variables
  const [loader, setLoader] = useState(true);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [cancelLoader, setCancelLoader] = useState<boolean>(false);
  const [isCancelModal, setIsCancelModal] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const {
    documentsList,
    statusId,
    statusPage,
    processingFees,
    processingFeePercentage,
    creditAmount,
  } = props?.route?.params ?? '';

  // console.log('IDCARD:::::::::::::::::::::::::::::::', idCard);/

  // console.log('SSSSSSSSSSSSSSSSSSSSSS::::::::::::', statusId);

  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [SuccessMessage, setSucesssMesaage] = useState<string>('');
  const [aadharError, setAaadharError] = useState<boolean>(false);
  const [NavigationDataId, setNavigationDataId] = useState<any>('');
  const dispatch = useDispatch();

  const getEmployeeLoanDetails = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.employeeLoanDetails,
  );
  const [onUpdateApiCall] = useMutation(mutations.UPDATE_LOAN_REQUEST);
  //Hook functions
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  //Mutations
  const [uploadDocuments] = useMutation(mutations.EMPLOYEE_CREATE_LOAN_REQUEST);
  const tenure = `${getEmployeeLoanDetails?.tenure} Month`;

  //Functions
  const onClickSubmit = async (isSubmit: boolean) => {
    setButtonLoader(isSubmit);
    setCancelLoader(!isSubmit);
    // console.log('isSubmit', isSubmit);

    try {
      const response = await onUpdateApiCall({
        variables: {
          updateLoanRequestId: statusId,
          isSubmitted: isSubmit,
        },
      });

      const {status, message, otp} = response?.data?.updateLoanRequest ?? {};
      // console.log(
      //   JSON.stringify(response?.data?.updateLoanRequest),
      //   'updateLoanRequest',
      // );

      if (status) {
        if (isSubmit) {
          // console.log(
          //   response?.data?.updateLoanRequest?.application,
          //   'updateLoanRequest',
          // );
          setButtonLoader(false);
          setCancelLoader(false);
          setSuccessModal(true);
          setNavigationDataId(
            response?.data?.updateLoanRequest?.data.applicationNo,
          );
          setSucesssMesaage(message);
        } else {
          setButtonLoader(false);
          setCancelLoader(false);
          setSuccessModal(true);
          setIsCancelModal(false);
          setSucesssMesaage(message);
          // console.log('message::::::::::::::::::', message);
        }
      } else {
        // console.log('message::::::::::::::::::', message);
        dispatch(
          Actions.errorMessage({
            errorMessage: message,
            status: true,
            errorType: ModalErrorType.Info,
          }),
        );
        setButtonLoader(false);
        setCancelLoader(false);
      }
    } catch (error) {
      setButtonLoader(false);
      setCancelLoader(false);

      if (
        (global as any).ErrorMessage == 'Your Aadhar and PAN Verify pending' ||
        (global as any).ErrorMessage == 'Your PAN Verify pending' ||
        (global as any).ErrorMessage == 'Your Aadhar Verify pending'
      ) {
        setAaadharError(true);
        setSuccessModal(true);
      } else {
        // setAaadharError(true);
        // setSuccessModal(true);
        dispatch(
          Actions.errorMessage({
            errorMessage: (global as any).ErrorMessage,
            status: true,
            errorType: ModalErrorType.Info,
          }),
        );
      }
    }
  };

  const onPressok = () => {
    if (SuccessMessage == 'Your Salary Advance Request Cancelled') {
      setSuccessModal(false);
      navigation.navigate('EmployeeHomeStack');
    } else if (
      SuccessMessage == 'Your Salary Advance Request Raised Successfully'
    ) {
      setSuccessModal(false);
      navigation.navigate(String.EMPLOYEE_THANKYOU, {
        application: NavigationDataId,
      });
    } else if (
      (global as any).ErrorMessage == 'Your Aadhar and PAN Verify pending' ||
      (global as any).ErrorMessage == 'Your PAN Verify pending' ||
      (global as any).ErrorMessage == 'Your Aadhar Verify pending'
    ) {
      // console.log('verify:::::::::');
      setSuccessModal(false);
      navigation.navigate('ProfileStack', {
        screen: String.EMPLOYEE_VERIFICATION,
        // params: {
        //   /* Add your props here */
        //   isVerification: true,
        // },
      });
    } else {
      // setSuccessModal(false);
    }
  };
  return (
    <SafeAreaView style={Styles.container}>
      <CancelModal
        loading={cancelLoader}
        title={'Are you sure want to cancel?'}
        buttonText1="Yes"
        buttonText2="No"
        modalVisible={isCancelModal}
        onBackDropPress={() => setIsCancelModal(false)}
        onPressModalCancel={() => {
          onClickSubmit(false);
        }}
        onPressModalProceed={() => {
          setIsCancelModal(false);
        }}
      />
      <ErrorModal
        modalVisible={successModal}
        errorType={aadharError ? ModalErrorType.Info : ModalErrorType.Success}
        title={aadharError ? (global as any).ErrorMessage : SuccessMessage}
        onBackDropPress={onPressok}
        onOkPress={onPressok}
      />
      <EmployeeLoanRequestSubHeader
        title={String.LOAN_REQUEST}
        showBackArrow={false}
        onPress={() => navigation.goBack()}
      />
      {!loader ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            backgroundColor: COLORS.DashboardBackgroundColor,
            flexGrow: 1,
          }}>
          <EmployeeLoanRequestReviewCardDetails
            processingFee={processingFees}
            processingFeePercentage={processingFeePercentage}
            creditAmount={creditAmount}
          />
          <View style={Styles.uploadFilesContainer}>
            <View style={commonStyles.flex(0.77)}>
              <Text style={Styles.title}>{String.UPLOADED_FILES}</Text>
              <View style={Styles.divider}></View>

              {documentsList?.map((item: any, index: number) => (
                <View style={Styles.formatContainer} key={index}>
                  <View style={{flex: 0.3, alignItems: 'center'}}>
                    <Text numberOfLines={2} style={Styles.text}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={{flex: 0.3, alignItems: 'center'}}>
                    {statusPage ? (
                      <Text style={Styles.text}>{item?.size}</Text>
                    ) : (
                      <Text style={Styles.text}>{formatBytes(item?.size)}</Text>
                    )}
                  </View>
                  <View
                    style={{
                      flex: 0.4,
                      alignItems: 'center',
                    }}>
                    <Text style={Styles.text}>
                      {truncateText({text: item.name, maxLength: 10})}{' '}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={Styles.mainConntainer}>
              <CommonButton
                onPress={() => {
                  setIsSubmitted(true);
                  onClickSubmit(true);
                }}
                textStyle={{...FONTS.body4}}
                loading={buttonLoader}
                title="Submit Application"
                containerStyle={{height: RFPercentage(6)}}
              />
              <CommonButton
                title="Cancel"
                disabled={buttonLoader}
                textStyle={{...FONTS.body4}}
                onPress={() => {
                  setIsCancelModal(true);
                }}
                containerStyle={{height: RFPercentage(6), marginTop: 5}}
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <EmployeeCommonLoader />
      )}
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DashboardBackgroundColor,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginTop: RFPercentage(1),
  },
  uploadFilesContainer: {
    marginHorizontal: RFPercentage(2),
    borderRadius: RFPercentage(2),
    elevation: Elevation.cardContainerElevation,
    backgroundColor: COLORS.whiteColor,
    padding: RFPercentage(2),
    marginVertical: RFPercentage(2),
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  text: {
    color: COLORS.blackColor,
    ...FONTS.body3,
    textAlign: 'center',
  },
  title: {
    color: COLORS.secondaryTextColor,
    ...FONTS.h3,
  },
  formatContainer: {
    backgroundColor: COLORS.lightBlue,
    justifyContent: 'space-around',
    borderRadius: RFPercentage(1),
    elevation: Elevation.inputElevation,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: RFPercentage(1.5),
    paddingHorizontal: RFPercentage(1.8),
    marginTop: RFPercentage(2),
  },
  mainConntainer: {
    flex: 0.23,
    marginVertical: RFPercentage(5),
    justifyContent: 'space-between',
  },
});

export {EmployeeLoanRequestReviewDetails};
