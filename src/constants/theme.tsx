import {Dimensions, PixelRatio} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import * as types from '../constants/types';
import {isAndroid} from '../utlis/functions';

// Get device dimensions
const {width, height} = Dimensions.get('window');

const pixelRatio = PixelRatio.get(); // Ratio for getting density of mobile devices
export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;

//Linear gradient
export const ADMIN_CARD_GRADIENTS1: string[] = ['#0001A7', '#6364D7'];
export const ADMIN_CARD_GRADIENTS2: string[] = ['#F87537', '#DE8961'];

export const BUTTON_COLOR1: string[] = ['#F87537', '#D84500'];
export const BUTTON_COLOR2: string[] = ['#EF9F7B', '#EF9F7B'];

export const deviceScreenHeight = Dimensions.get('screen').height;

// Responsive Layout Calculations
export const adjust = (size: number): number => {
  if (pixelRatio >= 2 && pixelRatio < 3) {
    if (deviceWidth < 360) {
      return size * 0.95;
    }
    if (deviceHeight < 667) {
      return size;
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.15;
    }
    return size * 1.25;
  }
  if (pixelRatio >= 3 && pixelRatio < 3.5) {
    if (deviceWidth <= 360) {
      return size;
    }
    if (deviceHeight < 667) {
      return size * 1.15;
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.2;
    }
    return size * 1.27;
  }
  if (pixelRatio >= 3.5) {
    if (deviceWidth <= 360) {
      return size;
    }
    if (deviceHeight < 667) {
      return size * 1.2;
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.25;
    }
    return size * 1.4;
  }
  return size;
};

const Palette: types.PaletteType = {
  white: '#fff',
  black: '#000000',
  primaryColour: '#e9742e',
  secondaryColor: '#0f2f51',
  grey: 'gray',
  lightGrey: '#8F8F8F',
  darkGrey: '#3B3B3B',
  lightYellow: '#f8d858',
  transparent: 'transparent',
  textInputFieldColor: '#F3F4FC',
  textColor: '#13131C',
  deepLightGrey: '#EAEAEA',
  lightBlue: '#EAEAFF',
  linearPrimaryColour: '#6FC8BA',
  linearSecondaryColor: '#8A87D5',
  errorRed: '#BA0000',
  backgroundColour: '#FFFFFF',
  GreenColour: '#209620',
  seeMoreGreen: '#33DD66',
  textLightBlack: '#161616',
  buttonDisableColor: '#FFEAE0',
  secondaryBackgroundColor: '#F5F5F5',
  DashboardBackgroundColor: '#F9F9F9',
  pinkColor: '#FF5EBF',
  cardLinearGradient: ['#0f2f51', '#0f2f51'],
  dimSecondaryColor: '#405c74',
  backgroundGrey: '#979797',
  whiteLightSilver: '#d5d5d5',
};

export const COLORS = {
  whiteColor: Palette.white,
  blackColor: Palette.black,
  lightYellow: Palette.lightYellow,
  transparent: Palette.transparent,
  primaryColor: Palette.primaryColour,
  secondaryColor: Palette.secondaryColor,
  lightBlue: Palette.lightBlue,
  textInputFieldColor: Palette.textInputFieldColor,
  textColor: Palette.textColor,
  lightGrey: Palette.lightGrey,
  darkGrey: Palette.darkGrey,
  deepLightGrey: Palette.deepLightGrey,
  linearPrimaryColour: Palette.linearPrimaryColour,
  linearSecondaryColor: Palette.linearSecondaryColor,
  errorRed: Palette.errorRed,
  backgroundColour: Palette.backgroundColour,
  GreenColour: Palette.GreenColour,
  seeMoreGreen: Palette.seeMoreGreen,
  grey: Palette.grey,
  secondaryTextColor: Palette.textLightBlack,
  buttonDisableColor: Palette.buttonDisableColor,
  secondaryBackgroundColor: Palette.secondaryBackgroundColor,
  DashboardBackgroundColor: Palette.DashboardBackgroundColor,
  pinkColor: Palette.pinkColor,
  cardLinearGradient: Palette.cardLinearGradient,
  dimSecondaryColor: Palette.dimSecondaryColor,
  backgroundGrey: Palette.backgroundGrey,
  whiteLightSilver: Palette.whiteLightSilver,
};

export const SIZES = {
  h1: 28,
  h3: 14,
  h4: 16,

  body1: 18,
  body4: 12,
  body3: 13,
  body2: 14,

  l1: 14,
  l2: 13,
  e1: 12,
  amount: 20,
  paise: 18,

  t1: 20,
  t2: 18,
  // global sizes
  base: 8,
  font: 14,
  radius: 40,
  padding: 10,
  padding2: 12,
  // Vector Icons size
  icon: 20,
  secondIcon: 15,
  icon_Color: '#273B4A',
  // font sizes
  largeTitle: 19,
  h0: 10,
  t0: 13,
  P0: 12,
  f0: 9,
  P1: 18,
  c0: 15,

  h5: 13,

  body5: 10,
  body6: 7,

  // app dimensions
  width,
  height,
};

export const Fonts: types.FontType = {
  Bold: isAndroid ? 'Poppins-Bold' : 'Overpass-Bold',
  ExtraBold: isAndroid ? 'Poppins-ExtraBold' : 'Overpass-ExtraBold',
  Regular: isAndroid ? 'Poppins-Regular' : 'Overpass-Regular',
  Medium: isAndroid ? 'Poppins-Medium' : 'Overpass-Medium',
  SemiBold: isAndroid ? 'Poppins-SemiBold' : 'Overpass-SemiBold',
  italic: isAndroid ? 'Poppins-Italic' : 'Overpass-Italic',
  MediumItalic: isAndroid ? 'Poppins-MediumItalic' : 'Overpass-MediumItalic',
};

export const FONTS = {
  amount: {
    fontFamily: Fonts.Bold,
    fontSize: moderateScale(SIZES.amount),
  },
  t1: {
    fontFamily: Fonts.ExtraBold,
    fontSize: moderateScale(SIZES.t1),
  },
  t2: {
    fontFamily: Fonts.Regular,
    fontSize: moderateScale(SIZES.t2),
  },
  paise: {
    fontFamily: Fonts.ExtraBold,
    fontSize: moderateScale(SIZES.paise),
  },
  h1: {
    fontFamily: Fonts.ExtraBold,
    fontSize: moderateScale(SIZES.h1),
  },
  h2: {
    fontFamily: Fonts.ExtraBold,
    fontSize: moderateScale(SIZES.body1),
  },
  h3: {
    fontFamily: Fonts.Bold,
    fontSize: moderateScale(SIZES.h3),
  },
  h4: {
    fontFamily: Fonts.ExtraBold,
    fontSize: moderateScale(SIZES.h4),
  },
  h5: {
    fontFamily: Fonts.Medium,
    fontSize: moderateScale(SIZES.h5),
  },
  h6: {
    fontFamily: Fonts.Bold,
    fontSize: moderateScale(SIZES.body5),
  },
  h7: {
    fontFamily: Fonts.Bold,
    fontSize: moderateScale(SIZES.h5),
  },
  body1: {
    fontFamily: Fonts.SemiBold,
    fontSize: moderateScale(SIZES.body1),
  },
  body2: {
    fontFamily: Fonts.SemiBold,
    fontSize: moderateScale(SIZES.body2),
  },
  body3: {
    fontFamily: Fonts.Medium,
    fontSize: moderateScale(SIZES.body3),
  },
  body4: {
    fontFamily: Fonts.Bold,
    fontSize: moderateScale(SIZES.body4),
  },
  body5: {
    fontFamily: Fonts.Regular,
    fontSize: moderateScale(SIZES.body5),
  },
  body6: {
    fontFamily: Fonts.Regular,
    fontSize: moderateScale(SIZES.body6),
  },
  l1: {
    fontFamily: Fonts.Bold,
    fontSize: moderateScale(SIZES.l1),
  },
  l2: {
    fontFamily: Fonts.Bold,
    fontSize: moderateScale(SIZES.l2),
  },
  e1: {
    fontFamily: Fonts.Regular,
    fontSize: moderateScale(SIZES.e1),
  },
};

const appTheme = {COLORS, SIZES, FONTS, Fonts, adjust};

export default appTheme;
