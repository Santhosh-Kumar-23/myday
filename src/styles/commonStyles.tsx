import {TextStyle} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as Types from '../constants/types';

export const flex = (flex: number): Types.KeyStrValNumType => {
  return {flex};
};

// Image Styles
export const imageView = (
  height: number | string,
  width: number | string,
): Types.KeyStrValNumStrType => {
  return {height, width};
};

// Margin Styles
export const margin = (
  marginHorizontal: number,
  marginVertical: number,
): Types.KeyStrValNumType => {
  return {marginHorizontal, marginVertical};
};

export const marginHorizontal = (
  marginLeft: number,
  marginRight: number,
): Types.KeyStrValNumType => {
  return {marginLeft, marginRight};
};

export const marginVertical = (
  marginBottom: number,
  marginTop: number,
): Types.KeyStrValNumType => {
  return {marginBottom, marginTop};
};

// Other Styles
export const backgroundColor = (
  backgroundColor: string,
): Types.KeyStrValStrType => {
  return {backgroundColor};
};

export const borderColor = (borderColor: string): Types.KeyStrValStrType => {
  return {borderColor};
};

// Padding Styles
export const padding = (
  paddingHorizontal: number,
  paddingVertical: number,
): Types.KeyStrValNumType => {
  return {paddingHorizontal, paddingVertical};
};

export const paddingHorizontal = (
  paddingLeft: number,
  paddingRight: number,
): Types.KeyStrValNumType => {
  return {paddingLeft, paddingRight};
};

export const paddingVertical = (
  paddingBottom: number,
  paddingTop: number,
): Types.KeyStrValNumType => {
  return {paddingBottom, paddingTop};
};

// Screen Styles
export const screenContainer = (
  backgroundColor: string,
): Types.KeyStrValNumStrType => {
  return {backgroundColor, flex: 1};
};

// Text Styles
export const textView = (
  size: number,
  fontFamily: Types.FontFamilyType,
  color: string,
  lineHeight: number = RFPercentage(2),
  align: Exclude<TextStyle['textAlign'], undefined> = 'left',
  textTransform: Exclude<TextStyle['textTransform'], undefined> = 'none',
): Types.KeyStrValNumStrType => {
  return {
    color,
    fontFamily,
    fontSize: size,
    lineHeight,
    textAlign: align,
    textTransform: textTransform,
  };
};

//align center
export const ViewCenter = (
  justifyContent: String,
  alignItems: String,
): Types.KeyStrValAllType => {
  return {
    justifyContent,
    alignItems,
  };
};
