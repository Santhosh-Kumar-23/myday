import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {COLORS, FONTS, Fonts} from '../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryColor,
  },
  logoConatiner: {
    height: moderateScale(30),
    width: moderateScale(30),
  },
  companyNameContainer: {
    flex: 0.85,
    backgroundColor: COLORS.whiteColor,
    justifyContent: 'center',
  },

  otherDetailsContainer: {
    flexDirection: 'row',
    marginTop: moderateScale(10),
  },
  loanDisbursedContainerMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
  },
  loanDisbursedContainer: {
    backgroundColor: COLORS.secondaryColor,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: moderateScale(5),
  },
  loanDisbursed: {
    fontSize: moderateScale(10),
    fontFamily: Fonts.Regular,
    color: COLORS.whiteColor,
  },
  heading: {
    ...FONTS.h3,
    color: COLORS.secondaryColor,
    marginHorizontal: moderateScale(20),
    marginBottom: moderateScale(10),
    marginTop: moderateScale(10),
  },
  mainContainer: {
    flex: 0.82,
    backgroundColor: COLORS.DashboardBackgroundColor,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingBottom: 100,
  },

  t1: {
    ...FONTS.h3,
    color: COLORS.darkGrey,
  },
  t2: {
    fontSize: moderateScale(11),
    fontFamily: Fonts.Regular,
    color: COLORS.lightGrey,
  },
  t3: {
    fontSize: moderateScale(11),
    fontFamily: Fonts.ExtraBold,
    color: COLORS.darkGrey,
  },
  t4: {
    fontSize: moderateScale(11),
    fontFamily: Fonts.ExtraBold,
    color: COLORS.lightGrey,
  },
  imageContainer: {
    height: 50,
    width: 50,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  subContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardContainer: {
    marginTop: moderateScale(20),
    flexDirection: 'row',
    elevation: 5,
    justifyContent: 'space-between',
    backgroundColor: COLORS.whiteColor,
    borderRadius: RFPercentage(2),
    marginHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(2),
    paddingHorizontal: RFPercentage(2),
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
  cardMainContainer1: {
    flex: 0.75,
    backgroundColor: COLORS.whiteColor,
  },
  cardMainContainer2: {
    flex: 0.25,
    alignItems: 'center',
    backgroundColor: COLORS.whiteColor,
    justifyContent: 'center',
  },
  fixBackground: {
    backgroundColor: COLORS.DashboardBackgroundColor,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 100,
    zIndex: -1000,
  },
});
