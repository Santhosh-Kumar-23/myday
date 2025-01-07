import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {COLORS, FONTS, Fonts} from '../constants/theme';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryColor,
  },
  textContainer: {
    marginVertical: moderateScale(10),
  },
  changeProfileContainer: {
    height: moderateScale(85),
    width: moderateScale(85),
    borderRadius: moderateScale(90),
    overflow: 'hidden',
    backgroundColor: COLORS.darkGrey,
    // borderWidth: 2,
    // marginTop: moderateScale(15),
    // borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: COLORS.whiteColor,
  },
  iconStyle: {
    height: RFPercentage(2),
    width: RFPercentage(2),
  },
  mainContainer: {
    flex: 0.9,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsContainer: {
    flexDirection: 'row',
    marginTop: moderateScale(10),
    padding: moderateScale(5),
    alignItems: 'center',
  },
  subHeading: {
    ...FONTS.body3,
    color: COLORS.darkGrey,
  },
  heading: {
    ...FONTS.h4,
    color: COLORS.secondaryColor,
    marginTop: moderateScale(10),
    // marginHorizontal: moderateScale(25),
  },
  t1: {
    fontFamily: Fonts.ExtraBold,
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: COLORS.secondaryColor,
  },
  t2: {
    fontFamily: Fonts.Medium,
    fontSize: moderateScale(12),
    color: COLORS.darkGrey,
    textAlign: 'center',
  },
  subContainer: {
    flex: 0.82,
    backgroundColor: COLORS.DashboardBackgroundColor,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  profileCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(-40),
  },

  ProfileContainer: {
    height: moderateScale(75),
    width: moderateScale(75),
    borderRadius: moderateScale(80),
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  Scrollcontainer: {
    marginHorizontal: moderateScale(25),
    backgroundColor: COLORS.DashboardBackgroundColor,
    marginBottom: moderateScale(100),
  },
  topHeader: {
    flexDirection: 'row',
    marginTop: moderateScale(15),
  },
});
