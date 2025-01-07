import * as String from '../constants/string';
import {COLORS} from './theme';
export const imagePickerConfigs: any = {
  cropperActiveWidgetColor: COLORS.primaryColor,
  cropperCancelColor: COLORS.whiteColor,
  cropperChooseColor: COLORS.primaryColor,
  cropperStatusBarColor: COLORS.blackColor,
  cropperTintColor: COLORS.errorRed,
  cropperToolbarColor: COLORS.primaryColor,
  cropperToolbarTitle: String.EDIT_PHOTO,
  cropping: true,
  enableRotationGesture: true,
  freeStyleCropEnabled: true,
  includeBase64: true,
  maxFiles: String.NINE,
  mediaType: String.ICP_MT_PHOTO,
};
