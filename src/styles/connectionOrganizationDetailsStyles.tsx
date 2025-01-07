import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {COLORS, FONTS, Fonts} from '../constants/theme';
import {isIos} from '../utlis/functions';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryColor,
  },
  subContainerMain: {
    flexDirection: 'row',
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
    fontFamily: Fonts.ExtraBold,
    color: COLORS.darkGrey,
  },
  t2: {
    fontSize: moderateScale(14),
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
    height: 35,
    width: 35,
    backgroundColor: COLORS.secondaryColor,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: 18,
    width: 18,
  },
  subContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  cardContainer: {
    flexDirection: 'row',
    elevation: 2,
    justifyContent: 'space-between',
    backgroundColor: COLORS.whiteColor,
    borderRadius: RFPercentage(2),
    marginHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(2.5),
    paddingHorizontal: RFPercentage(2.5),
    marginBottom: RFPercentage(5),
    shadowColor: isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  cardMainContainer1: {
    flex: 0.75,
  },
  cardMainContainer2: {
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: moderateScale(25),
  },
  text1: {
    fontSize: 12,
    fontFamily: Fonts.SemiBold,
    flex: 0.5,
    color: COLORS.darkGrey,
  },
  text2: {
    fontSize: 12,
    fontFamily: Fonts.Medium,
    flex: 0.5,
    color: COLORS.blackColor,
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
