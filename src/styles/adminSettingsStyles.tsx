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
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.whiteLightSilver,
    backgroundColor: COLORS.darkGrey,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 80,
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
