import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Elevation} from '../constants/enums';
import {COLORS, FONTS, Fonts} from '../constants/theme';
import {isIos} from '../utlis/functions';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColour,
  },
  welcome: {
    ...FONTS.h1,
    color: COLORS.primaryColor,
  },
  skip: {
    ...FONTS.h3,
    color: COLORS.grey,
    marginRight: 30,
  },
  skipButton: {
    alignSelf: 'flex-end',
    marginTop: 50,
  },
  arrowImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
  controlHeading: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.ExtraBold,
    color: COLORS.secondaryTextColor,
    textAlign: 'left',
    marginHorizontal: 10,
  },
  headingText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Bold,
    color: COLORS.darkGrey,
    marginHorizontal: 5,
    marginVertical: 10,
    marginLeft: 16,
    textAlign: 'left',
  },
  roundButton: {
    alignSelf: 'flex-end',
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryColor,
    // marginTop: 60
    marginRight: 30,
  },
  //get Started
  headerMainContainer1: {
    backgroundColor: 'transparent',
    flex: 0.65,
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  headerMainContainer2: {
    backgroundColor: 'transparent',
    flex: 0.45,
    justifyContent: 'space-between',
    // paddingHorizontal: 16,
  },
  title1: {
    fontSize: 14,
    fontFamily: Fonts.Bold,
    color: COLORS.secondaryColor,
    textAlign: 'left',
    marginTop: 20,
  },
  title2: {
    ...FONTS.h1,
    color: COLORS.blackColor,
    textAlign: 'left',
    marginTop: RFPercentage(1),
  },
  getStartedButtonContainer: {
    marginVertical: moderateScale(10),
    marginHorizontal: moderateScale(10),
  },
  loginPagetermsandConditionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logintermsText: {
    color: COLORS.secondaryColor,
    textDecorationLine: 'underline',
    fontSize: 12,
    fontFamily: Fonts.Bold,
  },
  loginandText: {
    fontSize: 12,
    fontFamily: Fonts.Bold,
    color: COLORS.grey,
  },
  //============================>Login Styles<======================================
  loginImgBg: {
    width: '100%',
    height: '100%',
    paddingHorizontal: RFPercentage(3),
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundColour,
  },
  welcomeBackText: {
    fontSize: 22,
    fontFamily: Fonts.Bold,
    color: COLORS.secondaryTextColor,
  },
  ToTextContinue: {
    fontSize: 12,
    fontFamily: Fonts.Medium,
    color: COLORS.secondaryTextColor,
  },
  loginContentContainer: {},
  welcomeContainer: {
    flex: 0.4,
    // backgroundColor: 'lime',
  },
  welcomeSubContainer: {
    marginTop: RFPercentage(5.6),
  },
  inputContainer: {
    flex: 0.6,
  },
  forgotPasswordBtn: {
    alignSelf: 'flex-end',
    marginVertical: 10,
    marginRight: RFPercentage(0.2),
  },
  forgotPasswordText: {
    ...FONTS.body4,
    color: COLORS.darkGrey,
  },
  buttonContainer: {
    marginBottom: RFPercentage(2.5),
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: moderateScale(50),
    marginBottom: RFPercentage(2.5),
  },
  didNotHaveAnyAccount: {
    fontSize: 14,
    fontFamily: Fonts.Medium,
    color: COLORS.primaryColor,
  },
  didNotHaveAnyAccount_SignUp: {
    marginHorizontal: moderateScale(5),
    color: COLORS.secondaryColor,
    fontSize: 14,
    fontFamily: Fonts.Bold,
  },

  //============================>Signup Styles<======================================
  chooseOrganization: {
    fontFamily: Fonts.Bold,
    fontSize: moderateScale(12),
    color: COLORS.blackColor,
    marginLeft: moderateScale(0.5),
    marginVertical: moderateScale(5),
  },
  dropDownContainer: {
    borderRadius: RFPercentage(1),
    // borderWidth: 1.5,
    backgroundColor: COLORS.whiteColor,
    elevation: Elevation.inputElevation,
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.2,
    borderColor: COLORS.lightGrey,
    height: verticalScale(42),
    justifyContent: isIos ? 'center' : 'flex-start',
    paddingHorizontal: moderateScale(isIos ? 20 : 0),
  },
  dropDownStyle: {
    color: '#333',
    fontFamily: Fonts.Medium,
    marginLeft: 7,
    marginBottom: 5,
    paddingRight: 60,
  },
  //============================>forgotPassword Styles<======================================
  forgotHeader: {
    flex: 0.3,
  },
  forgotPasswordHeader: {
    marginTop: RFPercentage(6.0),
  },
  forgotSecondView: {
    flex: 0.7,
    marginVertical: RFPercentage(4.0),
  },
  forgot_login: {
    color: COLORS.darkGrey,
    marginRight: RFPercentage(1.4),
    ...FONTS.l1,
    marginVertical: RFPercentage(1.2),
    alignSelf: 'flex-end',
  },
  verifyBtn: {
    marginVertical: moderateScale(50),
  },
  //============================>Otp Styles<======================================
  otpHeaderText: {
    fontSize: 22,
    fontFamily: Fonts.Bold,
    color: COLORS.blackColor,
  },
  otpFirstContainer: {
    marginTop: RFPercentage(2.5),
  },
  otpSubContainer: {},
  otpEmail: {
    marginTop: -5,
  },
  otpInputContainer: {
    marginTop: RFPercentage(0),
  },
  enterCodeText: {
    ...FONTS.l1,
    color: COLORS.darkGrey,
  },
  otpBoxContainer: {
    marginTop: RFPercentage(2.2),
    padding: 2,
  },
  otp_pinCodeContainer: {
    backgroundColor: COLORS.whiteColor,
    elevation: 3,
    borderRadius: RFPercentage(1),
    height: RFPercentage(5.8),
    width: RFPercentage(5.8),
  },
  inputFieldPinCodeErrorContainer: {
    backgroundColor: COLORS.whiteColor,
    borderColor: COLORS.errorRed,
    borderRadius: RFPercentage(1),
    height: RFPercentage(5.8),
    width: RFPercentage(5.8),
  },
  pinCodeText: {
    color: COLORS.textColor,
    fontFamily: Fonts.Regular,
  },
  focusStick: {},
  activePinCodeContainer: {},
  wrongOtpText: {
    ...FONTS.e1,
    color: COLORS.errorRed,
    marginTop: RFPercentage(1.4),
  },
  otpTimer: {
    alignSelf: 'center',
    ...FONTS.l1,
    color: COLORS.primaryColor,
  },
  resendCodeBtn: {
    alignSelf: 'center',
    marginTop: RFPercentage(1.3),
  },
  resendCodeBtnText: {
    color: COLORS.secondaryColor,
    ...FONTS.body4,
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.secondaryColor,
    textAlign: 'center',
  },

  //============================>Terms and condition Styles<======================================
  termsAndConditioncontainer: {
    flex: 1,
    backgroundColor: COLORS.secondaryBackgroundColor,
  },
  we_care_text: {
    ...FONTS.h1,
    color: COLORS.blackColor,
  },
  privacyContentText: {
    ...FONTS.body2,
    color: COLORS.grey,
    textAlign: 'justify',
  },
  privacyButtonView: {
    flexDirection: 'row',
    fontFamily: Fonts.Medium,
    fontSize: RFPercentage(1.5),
  },
  termsText: {
    ...FONTS.body2,
    textDecorationLine: 'underline',
    color: COLORS.secondaryColor,
  },
  andText: {
    fontSize: 12,
    fontFamily: Fonts.Bold,
    color: COLORS.grey,
  },
  tells_you_text: {
    ...FONTS.body2,
    color: COLORS.grey,
    textAlign: 'left',
  },
  changesContent: {
    marginTop: RFPercentage(4.0),
  },
  termsContentContainer: {
    flex: 0.8,
  },
  termsFooterContainer: {
    flex: 0.2,
  },
  termsFooterBtn: {
    marginVertical: RFPercentage(3.0),
  },
  declineButtonStyle: {
    backgroundColor: COLORS.buttonDisableColor,
    height: RFPercentage(5.9),
    borderRadius: RFPercentage(2.0),
    justifyContent: 'center',
    alignItems: 'center',
  },
  declineBtnText: {
    color: COLORS.secondaryTextColor,
    ...FONTS.body1,
  },
  //============================>Notification Styles<======================================
  importantMessageText: {
    ...FONTS.body1,
    color: COLORS.grey,
    marginTop: RFPercentage(2.0),
  },
  //============================>Password Success Styles<======================================
  passwordResetText: {
    ...FONTS.body1,
    color: COLORS.secondaryColor,
    textAlign: 'center',
  },
  resendContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: RFPercentage(3.2),
    paddingHorizontal: RFPercentage(3.6),
    paddingTop: RFPercentage(1.6),
  },
});
