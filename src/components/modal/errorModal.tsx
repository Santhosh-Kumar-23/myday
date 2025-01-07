import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {ModalErrorType} from '../../constants/enums';
import * as Interfaces from '../../constants/interfaces';
import {
  COLORS,
  FONTS,
  deviceScreenHeight,
  deviceWidth,
} from '../../constants/theme';
import * as Action from '../../redux/actions/actions';
import CommonButton from '../commonButton';
import VectorIcons from '../vectorIcons';
import { isIos } from '../../utlis/functions';

const ErrorModal: React.FC<Interfaces.ModalInterface> = ({
  title = '',
  modalVisible: isModalVisible,
  errorType = '',
  onOkPress = () => {},
}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(isModalVisible);

  let color, iconName;

  switch (errorType) {
    case ModalErrorType.Error:
      color = '#d61212';
      iconName = isIos? "close-circle-outline": 'closecircleo';

      break;
    case ModalErrorType.Info:
      color = COLORS.secondaryColor;
      iconName = isIos ? "information-circle-outline": 'infocirlceo';
      break;
    case ModalErrorType.Warning:
      color = COLORS.primaryColor;
      iconName = 'warning';
      break;

    case ModalErrorType.Success:
      color = COLORS.GreenColour;
      iconName = isIos ? "checkmark-circle-outline": 'checkcircleo';
      break;

    default:
      color = COLORS.whiteColor;
      break;
  }

  const renderIcon = (): React.JSX.Element => {
    return (
      <View
        style={[
          Styles.iconContainer,
          {
            backgroundColor: COLORS.DashboardBackgroundColor,
            overflow: 'hidden',
          },
        ]}>
        <VectorIcons name={iconName} type={isIos ? "ionicon" : "ant"} size={48} color={color} />
      </View>
    );
  };

  const renderErrorType = (): React.JSX.Element => {
    return <Text style={{color: color, ...FONTS.t1}}>{errorType}!</Text>;
  };

  const renderErrorMessage = (): React.JSX.Element => {
    return (
      <Text
        style={{
          textAlign: 'center',
          color: COLORS.secondaryTextColor,
          ...FONTS.body3,
        }}>
        <Text style={{...FONTS.h3, color: COLORS.blackColor}}>Note</Text> :{' '}
        {title}
      </Text>
    );
  };

  const renderButton = (): React.JSX.Element => {
    return (
      <CommonButton
        title={'Ok'}
        onPress={() => {
          onOkPress();
          dispatch(
            Action.errorMessage({
              errorMessage: '',
              status: false,
              errorType: '',
            }),
          );
        }}
        containerStyle={Styles.button}
        disableButton={true}
        linearBackground={[COLORS.lightGrey, COLORS.lightGrey]}
        textStyle={{
          color: COLORS.whiteColor,
          fontSize: moderateScale(12),
        }}
      />
    );
  };
  return (
    <ReactNativeModal
      isVisible={ title == "TokenExpiredError" ? false :isModalVisible}
      deviceHeight={deviceScreenHeight}
      statusBarTranslucent
      onBackdropPress={() => {
        dispatch(Action.errorMessage({errorMessage: '', status: false}));
      }}>
      <View style={Styles.container}>
        {renderIcon()}
        <View style={[Styles.errorTextContainer]}>
          {renderErrorType()}
          {renderErrorMessage()}
          {renderButton()}
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default ErrorModal;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.DashboardBackgroundColor,
    width: deviceWidth - 70,
    alignSelf: 'center',
    borderRadius: moderateScale(10),
  },
  button: {
    width: scale(120),
    height: verticalScale(30),
    marginVertical: moderateScale(8),
    marginRight: moderateScale(8),
  },
  iconContainer: {
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(15),
  },
  errorTextContainer: {
    paddingHorizontal: moderateScale(15),
    paddingBottom: moderateScale(15),
    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
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
