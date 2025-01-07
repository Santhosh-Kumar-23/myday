import React, {useState} from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  View,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Elevation} from '../constants/enums';
import * as Interfaces from '../constants/interfaces';
import {COLORS, FONTS, Fonts} from '../constants/theme';
import {isIos} from '../utlis/functions';
import VectorIcons from './vectorIcons';

const AuthTextInput: React.FC<Interfaces.AuthTextInputProps> = ({
  containerStyle = null,
  label = 'Name',
  value = '',
  aadhar = false,
  editable = !false,
  inputStyle = null,
  placeholder = '',
  placeholderTextColor = COLORS.grey,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  onChangeText,
  selectionColor = COLORS.grey,
  errorText = '',
  error = false,
  maxLength,
}) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [showHide, setShowHide] = useState<boolean>(secureTextEntry);
  return (
    <View style={[containerStyle]}>
      <Text style={Style.labelContainer}>{label}</Text>
      <View
        style={{
          elevation: Elevation.inputElevation,
          backgroundColor: COLORS.whiteColor,
          borderRadius: RFPercentage(1),
          marginHorizontal: 3,
          shadowOffset: {width: 0, height: 2},
        shadowColor: '#000',
          shadowOpacity: 0.2,
          // marginVertical: 1.5,
        }}>
        <View
          style={{
            borderColor: error
              ? COLORS.errorRed
              : focus
              ? COLORS.secondaryColor
              : COLORS.lightGrey,
            borderRadius: RFPercentage(1),
            height: multiline ? null : verticalScale(44),
            paddingVertical: multiline ? 10 : null,
            flexDirection: 'row',
            backgroundColor:editable == false && COLORS.deepLightGrey,
          }}>
          <TextInput
            editable={editable}
            autoCapitalize="none"
            placeholder={placeholder}
            selectionColor={selectionColor}
            onChangeText={onChangeText}
            maxLength={maxLength}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={showHide}
            keyboardType={keyboardType}
            multiline={multiline}
            underlineColorAndroid={COLORS.transparent}
            style={[
              Style.inputContainer,
              inputStyle,
              secureTextEntry ? {flex: 0.8} : {flex: 1},
              aadhar && {paddingVertical: 0},
              {
                textAlign: aadhar ? 'center' : 'left',
                letterSpacing: aadhar ? 7 : 0,
                fontFamily: aadhar ? Fonts.SemiBold : Fonts.Medium,
               
              },
              {
                backgroundColor:editable == false && COLORS.deepLightGrey,
              }
            ]}
            onFocus={(e: NativeSyntheticEvent<TextInputFocusEventData>) =>
              setFocus(true)
            }
            onBlur={(e: NativeSyntheticEvent<TextInputFocusEventData>) =>
              setFocus(false)
            }
            value={value}
          />
          {secureTextEntry && (
            <View style={Style.iconContainer}>
              {secureTextEntry && (
                <Pressable
                  onPress={() => {
                    setShowHide(!showHide);
                  }}>
                  {!showHide ? (
                    <VectorIcons
                      type="ionicon"
                      name="eye"
                      size={RFPercentage(2.2)}
                      color={COLORS.darkGrey}
                    />
                  ) : (
                    <VectorIcons
                      type="ionicon"
                      name="eye-off"
                      size={RFPercentage(2.2)}
                      color={COLORS.darkGrey}
                    />
                  )}
                </Pressable>
              )}
            </View>
          )}
        </View>
      </View>

      {error ? <Text style={Style.errorText}>{errorText}</Text> : null}
    </View>
  );
};

const Style = StyleSheet.create({
  errorText: {
    color: COLORS.errorRed,
    fontSize: 12,
    fontFamily: Fonts.Medium,
    marginLeft: RFPercentage(1.0),
    marginTop: RFPercentage(1),
  },
  iconContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: RFPercentage(2),
    borderBottomRightRadius: RFPercentage(2),
    backgroundColor: COLORS.whiteColor,
  },
  inputContainer: {
    height: isIos ? '98%' : '100%',
    width: '100%',
    ...FONTS.l1,
    backgroundColor: COLORS.whiteColor,
    borderRadius: RFPercentage(2),
    fontSize: 14,
    fontFamily: Fonts.Medium,
    paddingHorizontal: RFPercentage(2.2),
    flex: 0.8,

    color: COLORS.blackColor,
    borderBottomWidth: RFPercentage(0),
  },
  labelContainer: {
    fontFamily: Fonts.SemiBold,
    fontSize: moderateScale(12),
    color: COLORS.secondaryTextColor,
    marginLeft: RFPercentage(0.5),
    marginVertical: RFPercentage(0.8),
  },
});

export default AuthTextInput;
