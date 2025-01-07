import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {COLORS, FONTS} from '../constants/theme';

export const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.secondaryColor,
    marginBottom: 50,
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
    backgroundColor: COLORS.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.whiteColor,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    borderRadius: moderateScale(80),
  },
  subContainer: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
    flex: 1,
  },
  buttonContainer: {
    marginBottom: RFPercentage(3.5),
  },
  heading: {
    ...FONTS.h4,
    color: COLORS.secondaryColor,
  },
  mainSubContainer: {
    flex: 0.82,
    backgroundColor: COLORS.DashboardBackgroundColor,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
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
