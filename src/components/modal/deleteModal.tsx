import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import * as Interfaces from '../../constants/interfaces';
import {COLORS, FONTS, deviceScreenHeight} from '../../constants/theme';
import CommonButton from '../commonButton';

const DeleteModal: React.FC<Interfaces.ModalInterface> = ({
  modalVisible: isModalVisible,
  loaderColor,
  title = '',
  buttonText1 = '',
  buttonText2 = '',
  onPressModalCancel: onPressCancel,
  onPressModalProceed: onPressProceed,
  onBackDropPress: onBackdropPress,
  loader = false,
}) => {
  return (
    <View>
      <ReactNativeModal
        isVisible={isModalVisible}
        deviceWidth={deviceScreenHeight}
        statusBarTranslucent
        style={Styles.views}
        deviceHeight={deviceScreenHeight}
        onBackdropPress={onBackdropPress}>
        <View style={Styles.container}>
          <Image />
          <Text style={Styles.heading}>{title}</Text>

          <CommonButton
            title={buttonText2}
            loading={loader}
            loaderColor={loaderColor}
            onPress={onPressProceed}
            disableButton={true}
            linearBackground={[
              COLORS.buttonDisableColor,
              COLORS.buttonDisableColor,
            ]}
            containerStyle={{
              width: scale(200),
              height: verticalScale(30),
              marginVertical: moderateScale(10),
            }}
            textStyle={{
              fontSize: moderateScale(12),
              color: COLORS.darkGrey,
            }}
          />
          <CommonButton
            title={buttonText1}
            onPress={onPressCancel}
            containerStyle={{
              width: scale(200),
              height: verticalScale(30),
              marginVertical: moderateScale(10),
            }}
            textStyle={{
              color: COLORS.whiteColor,
              fontSize: moderateScale(12),
            }}
          />
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default DeleteModal;

const Styles = StyleSheet.create({
  container: {
    height: verticalScale(150),
    backgroundColor: COLORS.backgroundColour,
    alignItems: 'center',
    padding: moderateScale(10),
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
  },
  views: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  heading: {
    ...FONTS.h5,
    color: COLORS.secondaryTextColor,
  },
});
