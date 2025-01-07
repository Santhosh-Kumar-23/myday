import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import ReactNativeModal from 'react-native-modal';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import * as Interfaces from '../../constants/interfaces';
import {COLORS, FONTS, deviceScreenHeight} from '../../constants/theme';
import CommonButton from '../commonButton';
import VectorIcons from '../vectorIcons';

const DocumentsDeleteModal: React.FC<Interfaces.ModalInterface> = ({
  title = '',
  buttonText1 = '',
  buttonText2 = '',
  modalVisible: isModalVisible,
  onPressModalCancel: onPressCancel,
  onPressModalProceed: onPressProceed,
  onBackDropPress: onBackdropPress,
  loading,
}) => {
  return (
    <View>
      <ReactNativeModal
        isVisible={isModalVisible}
        deviceHeight={deviceScreenHeight}
        statusBarTranslucent
        onBackdropPress={onBackdropPress}
        >
        <View style={Styles.container}>
          {/* <Image source={Images.logoutDoor} style={Styles.imageStyle} /> */}
          <VectorIcons
            name="delete"
            type="material"
            size={40}
            color={COLORS.secondaryColor}
          />
          <Text style={Styles.heading}>{title}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <CommonButton
              loading={loading}
              title={buttonText2}
              onPress={onPressProceed}
              containerStyle={{
                width: scale(120),
                height: verticalScale(30),
                marginVertical: moderateScale(10),
                marginRight: moderateScale(8),
              }}
              textStyle={{
                fontSize: moderateScale(14),
              }}
            />
            <CommonButton
              title={buttonText1}
              onPress={onPressCancel}
              containerStyle={{
                width: scale(120),
                height: verticalScale(30),
                marginVertical: moderateScale(10),
              }}
              disableButton={true}
              linearBackground={[
                COLORS.buttonDisableColor,
                COLORS.buttonDisableColor,
              ]}
              textStyle={{
                color: COLORS.secondaryTextColor,
                fontSize: moderateScale(12),
              }}
            />
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default DocumentsDeleteModal;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundColour,
    alignItems: 'center',
    padding: moderateScale(20),
    borderRadius: moderateScale(20),
  },
  views: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  heading: {
    ...FONTS.h4,
    color: COLORS.secondaryTextColor,
    textAlign: 'center',
    marginVertical: moderateScale(20),
  },
  imageStyle: {
    height: verticalScale(30),
    width: verticalScale(30),
    resizeMode: 'contain',
  },
});
