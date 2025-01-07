import {StyleSheet} from 'react-native';
import {isIOS} from 'react-native-elements/dist/helpers';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {COLORS, FONTS} from '../constants/theme';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryColor,
    marginBottom: isIOS && 50,
  },
  chnageProfileImageText: {
    color: COLORS.secondaryColor,
    marginTop: moderateScale(10),
    ...FONTS.h3,
  },
  changeProfileContainer: {
    height: moderateScale(85),
    width: moderateScale(85),
    borderRadius: moderateScale(90),
    overflow: 'hidden',
    backgroundColor: COLORS.darkGrey,
    marginTop: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  profile: {
    flex: 0.2,
  },
  emailContainer: {
    flex: 0.8,
    justifyContent: 'center',
  },
  topHeader: {
    flexDirection: 'row',
    marginTop: moderateScale(15),
  },
  profileContainer: {
    borderRadius: RFPercentage(20),
    height: RFPercentage(7.0),
    width: RFPercentage(7.0),
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 2,
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
  dividerStyle: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginTop: moderateScale(15),
    // marginHorizontal: moderateScale(25),
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
