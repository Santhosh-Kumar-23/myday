import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {Elevation} from '../constants/enums';
import {COLORS, FONTS, Fonts} from '../constants/theme';
import {isIos} from '../utlis/functions';

export const Styles = StyleSheet.create({
  dotLine: {
    alignSelf: 'center',
  },
  borderLine: {
    width: 2,
    height: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  pipeLine: {
    ...FONTS.h3,
    color: COLORS.darkGrey,
    textAlign: 'left',
    marginLeft: moderateScale(15),
    marginBottom: moderateScale(12),
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryColor,
    marginBottom: 100,
  },
  overView: {
    fontSize: 15,
    fontFamily: Fonts.Bold,
    color: COLORS.blackColor,
  },
  departmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: RFPercentage(1),
  },
  t1: {
    ...FONTS.body4,
    color: COLORS.lightGrey,
    textAlign: 'left',
    marginTop: moderateScale(10),
    marginLeft: moderateScale(12),
  },
  amountContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  t2: {
    ...FONTS.h4,
    color: COLORS.darkGrey,
    paddingBottom: moderateScale(20),
  },
  t3: {
    ...FONTS.body5,
    color: COLORS.primaryColor,
    textAlign: 'center',
  },
  t4: {
    ...FONTS.body4,
    color: COLORS.darkGrey,
  },
  box: {
    height: moderateScale(100),
    width: '44%',
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.whiteColor,
    elevation: Elevation.cardContainerElevation,
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  loanAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: moderateScale(10),
  },
  overViewContainer: {
    marginHorizontal: RFPercentage(2.5),
    marginVertical: moderateScale(10),
  },
  piplineProcessText: {
    ...FONTS.e1,
    color: COLORS.darkGrey,
  },
  box1Container: {
    // height: 60,
    backgroundColor: COLORS.whiteColor,
    elevation: Elevation.cardContainerElevation,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(8),
    marginTop: moderateScale(20),
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  approveContainer: {
    width: '45%',
    height: moderateScale(40),
    backgroundColor: COLORS.seeMoreGreen,
    elevation: Elevation.cardContainerElevation,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  approve: {
    ...FONTS.h3,
    color: COLORS.whiteColor,
  },
  approveMainContainer: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: moderateScale(20),
    marginBottom: moderateScale(20),
  },
  messageContainer: {
    marginTop: moderateScale(20),
    marginBottom: moderateScale(20),
    marginHorizontal: moderateScale(20),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  },
  messageText: {
    fontSize: moderateScale(18),
    fontWeight: '800',
    marginHorizontal: 10,
  },
});
