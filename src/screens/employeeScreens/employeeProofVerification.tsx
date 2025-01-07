import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {
  DeviceEventEmitter,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import * as mutation from '../../api/mutation';
import AuthTextInput from '../../components/authTextInput';
import CommonButton from '../../components/commonButton';
import {EmployeeLoanRequestSubHeader} from '../../components/employeeComponents/employeeLoanRequestSubHeader';
import ErrorModal from '../../components/modal/errorModal';
import {ModalErrorType} from '../../constants/enums';
import * as String from '../../constants/string';
import {COLORS} from '../../constants/theme';
import * as Functions from '../../utlis/functions';

const EmployeeProofVerification: React.FC<{}> = (props: any) => {
  const {data_Item} = props.route.params;
  const {navigation} = props;
  const [proof, setProof] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [SuccessMessage, setSucesssMesaage] = useState<string>('');
  const [TransID, setTransId] = useState<any>('');
  const [aadharError, setAaadharError] = useState<boolean>(false);
  const [generateAadharOtpApiCall] = useMutation(mutation.GenerateAadharOtp);
  const [panCardApiCall] = useMutation(mutation.VerifyPan);
  console.log(data_Item.Document, 'data_Item.Document');
  const handlePanValidations = (pan: string): boolean => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };
  console.log(proof, 'proof');
  const handleVerify = (): void => {
    // Check for Aadhar validation
    const checkAadhar: boolean =
      data_Item.Document === 'Aadhaar Verification' &&
      Functions.handleAadharCardValidation(proof);

    // Check for PAN validation
    const checkForPan: boolean =
      data_Item.Document === 'PAN Verification' && handlePanValidations(proof);

    console.log(
      `PAN Validation: ${checkForPan}, Aadhar Validation: ${checkAadhar}`,
    );

    // Handle Aadhar validation
    if (checkAadhar) {
      setIsError(false);
      const aadharNo = proof.replace(/-/g, '');
      console.log('Aadhar Number:', aadharNo);
      onApicallAadhar(aadharNo);
      console.log('Aadhar verification initiated:', proof);
    }
    // Handle PAN validation
    else if (checkForPan) {
      setIsError(false);
      console.log('PAN verification initiated:', proof);
      onPanCardverify(proof);
    }
    // Handle invalid input
    else {
      setIsError(true);
      console.log('Invalid Aadhar or PAN input');
    }
  };

  console.log(proof, 'proof');
  const onPanCardverify = (panNumber: string) => {
    setButtonLoader(true);
    panCardApiCall({
      variables: {
        docType: 523,
        panNumber: panNumber,
      },
      onCompleted: data => {
        const {status, message, success, msg} = data?.verifyPan ?? '';
        console.log(data);
        if (status) {
          setSucesssMesaage('PAN Verified Successfully');
          setButtonLoader(false);
          setSuccessModal(true);
          setAaadharError(false);
        } else {
          setButtonLoader(false);
          setAaadharError(true);
          setSuccessModal(true);
          setSucesssMesaage((global as any).ErrorMessage);
        }
      },
      onError: error => {
        setAaadharError(true);
        setButtonLoader(false);
        setSuccessModal(true);
        setSucesssMesaage((global as any).ErrorMessage);
      },
    });
  };
  const onApicallAadhar = (aadharNo: string) => {
    setButtonLoader(true);
    console.log('aadharNo', aadharNo);
    generateAadharOtpApiCall({
      variables: {
        aadharNo: aadharNo,
        docType: 211,
      },
      onCompleted: data => {
        const {status, message, otp, msg, tsTransId} =
          data?.generateAadharOtp ?? '';
        console.log('data', data);
        if (status) {
          setButtonLoader(false);
          setSuccessModal(true);
          setAaadharError(false);
          setSucesssMesaage(msg);
          setTransId(tsTransId);
          console.log('tsTransId', tsTransId);
        }
      },
      onError: error => {
        setSuccessModal(true);
        setButtonLoader(false);
        setAaadharError(true);
        setSucesssMesaage((global as any).ErrorMessage);
        console.log('error', error);
      },
    });
  };
  const onPressOk = () => {
    if (data_Item.Document == 'PAN Verification') {
      if (aadharError) {
        setSuccessModal(false);
      } else {
        setSuccessModal(false);
        DeviceEventEmitter.emit('REFETCH_EMPLOYEE_DETAILS');
        navigation.goBack();
      }
    } else {
      if (aadharError) {
        setSuccessModal(false);
      } else {
        const aadharNo = proof.replace(/-/g, '');
        setSuccessModal(false);
        navigation.navigate(String.EMPLOYEE_VERIFICATION_OTP, {
          transId: TransID,
          aadharNo: aadharNo,
          docType: 211,
        });
      }
    }
  };
  const renderLogo = (): React.JSX.Element => {
    return (
      <Image
        source={data_Item.img}
        style={styles.image}
        resizeMode={String.CONTAIN}
      />
    );
  };

  const renderInput = (): React.JSX.Element => {
    const checkForProofEmpty: boolean = !proof && isError;

    const checkForValidProof: boolean =
      data_Item.Document == 'PAN Verification'
        ? Boolean(proof) && Functions.handlePanValidation(proof)
        : Boolean(proof) && !Functions.handleAadharCardValidation(proof);

    const checkForProofError: boolean =
      checkForProofEmpty || checkForValidProof;

    return (
      <>
        <AuthTextInput
          multiline={data_Item.Document != 'PAN Verification'}
          aadhar={data_Item.Document === 'PAN Verification' ? false : true}
          label={
            data_Item.Document === 'PAN Verification'
              ? String.ENTER_PAN_CARD_NUMBER
              : String.ENTER_AADHAAR_CARD_NUMBER
          }
          containerStyle={styles.inputContainer}
          placeholder={
            data_Item.Document == 'PAN Verification'
              ? String.PAN_PLACEHOLDER
              : String.AADHAAR_PLACEHOLDER
          }
          onChangeText={text => {
            const numericValue = text.replace(/\D/g, '');
            const AdhaarformattedValue =
              numericValue.match(/.{1,4}/g)?.join('-') || '';
            const panformattedText = text.toUpperCase();
            setProof(
              data_Item.Document == 'PAN Verification'
                ? panformattedText
                : AdhaarformattedValue,
            );
          }}
          maxLength={
            data_Item.Document == 'PAN Verification'
              ? String.TEN
              : String.FOURTEEN
          }
          keyboardType={
            data_Item.Document == 'PAN Verification' ? 'default' : 'numeric'
          }
          error={checkForProofError}
          value={proof}
          errorText={
            data_Item.Document == 'PAN Verification'
              ? checkForValidProof
                ? String.INVALID_PAN
                : String.PAN_IS_REQUIRED
              : checkForValidProof
              ? String.AADHAAR_IS_INVALID
              : String.AADHAAR_IS_REQUIRED
          }
        />
      </>
    );
  };

  const renderButton = (): React.JSX.Element => {
    return (
      <View style={styles.buttonContainer}>
        <CommonButton
          title={String.VERIFY}
          loading={buttonLoader}
          containerStyle={styles.button}
          onPress={(): void => {
            handleVerify();
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <EmployeeLoanRequestSubHeader
        title={data_Item.Document}
        onPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.topView}>
          {renderLogo()}
          {renderInput()}
          {renderButton()}
        </View>
      </KeyboardAwareScrollView>
      <ErrorModal
        modalVisible={successModal}
        errorType={aadharError ? ModalErrorType.Error : ModalErrorType.Success}
        title={SuccessMessage}
        onBackDropPress={onPressOk}
        onOkPress={onPressOk}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DashboardBackgroundColor,
  },
  image: {
    width: scale(80),
    height: verticalScale(80),
    alignSelf: 'center',
    marginTop: moderateScale(20),
  },
  inputContainer: {
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScale(32),
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: moderateScale(10),
  },
  topView: {flex: 1},
});

export {EmployeeProofVerification};
