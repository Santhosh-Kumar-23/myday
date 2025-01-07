import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {COLORS, FONTS, Fonts} from '../constants/theme';
import {isIos} from '../utlis/functions';

export const styles = StyleSheet.create({
  noDataFound: {
    ...FONTS.h3,
    color: COLORS.secondaryColor,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryColor,
  },
  noDataFoundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  otherDetailsContainer: {
    flexDirection: 'column',
    marginTop: moderateScale(10),
  },
  heading: {
    ...FONTS.h3,
    color: COLORS.secondaryColor,
    marginHorizontal: RFPercentage(2.5),
    marginTop: moderateScale(10),
  },
  t1: {
    ...FONTS.h3,
    color: COLORS.secondaryColor,
  },
  t2: {
    fontSize: moderateScale(11),
    fontFamily: Fonts.Regular,
    color: COLORS.blackColor,
  },
  t3: {
    fontSize: moderateScale(11),
    fontFamily: Fonts.SemiBold,
    color: COLORS.darkGrey,
  },
  t4: {
    fontSize: moderateScale(11),
    fontFamily: Fonts.ExtraBold,
    color: COLORS.blackColor,
  },
  imageContainer: {
    height: 65,
    width: 65,
    backgroundColor: COLORS.DashboardBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
    borderRadius: moderateScale(50),
    elevation: moderateScale(1.5),
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    borderRadius: moderateScale(50),
  },
  subContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mainContainer: {
    flex: 0.82,
    backgroundColor: COLORS.DashboardBackgroundColor,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingBottom: 100,
  },
  cardContainer: {
    marginTop: RFPercentage(2),
    flexDirection: 'row',
    shadowColor: isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
    elevation: 2,
    justifyContent: 'space-between',
    backgroundColor: COLORS.whiteColor,
    borderRadius: RFPercentage(2),
    marginHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(2),
    paddingHorizontal: RFPercentage(2),
  },
  cardMainContainer1: {
    flex: 0.75,
  },
  cardMainContainer2: {
    flex: 0.25,
    alignItems: 'center',
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
