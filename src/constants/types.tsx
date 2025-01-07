import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {
  IconButtonProps,
  IconProps as VectorIconProps,
} from 'react-native-vector-icons/Icon';

export type FontFamilyType =
  | 'Overpass-Black'
  | 'Overpass-BlackItalic'
  | 'Overpass-Bold'
  | 'Overpass-BoldItalic'
  | 'Overpass-ExtraBold'
  | 'Overpass-ExtraLight'
  | 'Overpass-ExtraLightItalic'
  | 'Overpass-Italic'
  | 'Overpass-LightItalic'
  | 'Overpass-Medium'
  | 'Overpass-MediumItalic'
  | 'Overpass-Regular'
  | 'Overpass-SemiBold'
  | 'Overpass-SemiBoldItalic'
  | 'Overpass-Thin'
  | 'Overpass-ThinItalic';

export type KeyStrValAllType = {[key: string]: any};

export type KeyStrValNumStrType = {[key: string]: number | string};

export type KeyStrValNumType = {[key: string]: number};

export type KeyStrValStrType = {[key: string]: string};

export type AuthState = 'auth' | 'employee' | 'organization | admin';

export type AppContextType = {
  Employee: () => void;
  Organization: () => void;
  Admin: () => void;
  AuthStack: () => void;
  clearUserInfo: () => void;
};

export declare type IconType =
  | 'material'
  | 'material-community'
  | 'simple-line-icon'
  | 'zocial'
  | 'font-awesome'
  | 'octicon'
  | 'ionicon'
  | 'foundation'
  | 'evilicon'
  | 'entypo'
  | 'antdesign'
  | 'font-awesome-5'
  | string;

export type IconProps = IconButtonProps & {
  type?: IconType;
  Component?: typeof React.Component;
  reverse?: boolean;
  raised?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  iconProps?: VectorIconProps;
  reverseColor?: string;
  disabled?: boolean;
  disabledStyle?: StyleProp<ViewStyle>;
  solid?: boolean;
  brand?: boolean;
};

// Type for color palette
export type PaletteType = {
  white: string;
  black: string;
  transparent: string;
  lightYellow: string;
  primaryColour: string;
  textInputFieldColor: string;
  textColor: string;
  lightGrey: string;
  deepLightGrey: string;
  darkGrey: string;
  lightBlue: string;
  linearPrimaryColour: string;
  linearSecondaryColor: string;
  errorRed: string;
  backgroundColour: string;
  GreenColour: string;
  seeMoreGreen: string;
  grey: string;
  secondaryColor: string;
  textLightBlack: string;
  buttonDisableColor: string;
  secondaryBackgroundColor: string;
  DashboardBackgroundColor: string;
  pinkColor: string;
  cardLinearGradient: [string, string];
  dimSecondaryColor: string;
  backgroundGrey: string;
  whiteLightSilver: string;
};

// Type for font styles
export type FontType = {
  Bold: string;
  ExtraBold: string;
  Regular: string;
  Medium: string;
  SemiBold: string;
  italic: string;
  MediumItalic: string;
};
