import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import * as Icons from '../constants/icons';
import * as Interfaces from '../constants/interfaces';
import * as String from '../constants/string';
import {BUTTON_COLOR1, BUTTON_COLOR2, COLORS, FONTS} from '../constants/theme';

const CommonButton: React.FC<Interfaces.ButtonProps> = ({
  containerStyle = null,
  disabled = false,
  loaderColor,
  title = 'Button',
  loading = false,
  onPress,
  textStyle = null,
  icon = false,
  linearBackground = [],
  disableButton = false,
}) => {
  const disable = !disabled ? BUTTON_COLOR1 : BUTTON_COLOR2;
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[containerStyle, {borderRadius: 20}]}>
      <LinearGradient
        colors={disableButton ? linearBackground : disable}
        style={[
          {
            height: verticalScale(40),
            borderRadius: RFPercentage(1),
            elevation: 2,
            flexDirection: icon ? 'row' : 'column',
            justifyContent: icon ? 'space-between' : 'center',
            paddingHorizontal: icon ? moderateScale(20) : moderateScale(0),
            alignItems: 'center',
          },
          containerStyle,
        ]}
        start={{x: moderateScale(0), y: moderateScale(0)}}
        end={{x: moderateScale(1), y: moderateScale(0)}}>
        <Text
          style={[
            {
              color: COLORS.whiteColor,
              ...FONTS.h3,
            },
            textStyle,
          ]}>
          {!loading ? (
            title
          ) : (
            <ActivityIndicator color={loaderColor ? 'black' : 'white'} />
          )}
        </Text>
        {icon && (
          <Image
            tintColor={COLORS.whiteColor}
            source={Icons.rightArrow}
            resizeMode={String.CONTAIN}
            style={Styles.imageStyle}
          />
        )}
      </LinearGradient>
    </Pressable>
  );
};

const Styles = StyleSheet.create({
  imageStyle: {
    height: RFPercentage(1.5),
    width: RFPercentage(1),
  },
});

export default CommonButton;
