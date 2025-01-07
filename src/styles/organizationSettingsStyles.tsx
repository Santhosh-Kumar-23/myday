import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {COLORS, FONTS} from '../constants/theme';
import {isIos} from '../utlis/functions';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryColor,
    marginBottom: isIos && 50,
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
  iconStyle: {
    height: RFPercentage(2),
    width: RFPercentage(2),
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
  topHeader: {
    flexDirection: 'row',
    marginTop: moderateScale(15),
    // marginHorizontal: moderateScale(25),
  },
  dividerStyle: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginTop: moderateScale(15),
    // marginHorizontal: moderateScale(25),
  },
  profile: {
    flex: 0.2,
    // alignItems: 'center',
  },
  emailContainer: {
    flex: 0.8,
    justifyContent: 'center',
  },
  profileContainer: {
    borderRadius: RFPercentage(20),
    height: RFPercentage(7.0),
    width: RFPercentage(7.0),
    justifyContent: 'center',
    elevation: 2,
    alignItems: 'center',
    backgroundColor: COLORS.darkGrey,
  },
  profileSubContainer: {
    height: RFPercentage(4),
    width: RFPercentage(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFPercentage(20),
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: RFPercentage(20),
  },
  name: {
    ...FONTS.h3,
    color: COLORS.blackColor,
  },
  email: {
    ...FONTS.body4,
    color: COLORS.blackColor,
  },
});
