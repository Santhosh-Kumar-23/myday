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
import * as mutation from '../../api/mutation';
import { checkAndEnableBiometrics } from '../../utlis/bioMetrics';
import { useMutation } from '@apollo/client';

const BiometricsModal: React.FC<Interfaces.ModalInterface> = ({
  modalVisible: isModalVisible,
}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(isModalVisible);
  const [notifyandBiomtericApiCall] = useMutation(
    mutation.Notification_biomterics,
  );

  let color, iconName;


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
        <VectorIcons name={"finger-print"} type="ionicon" size={48} color={COLORS.primaryColor} />
      </View>
    );
  };

  const renderErrorType = (): React.JSX.Element => {
    return <Text style={{color: COLORS.textColor, ...FONTS.t1}}>{"Allow Biometrics"}!</Text>;
  };

  const renderErrorMessage = (): React.JSX.Element => {
    return (
      <Text
        style={{
          textAlign: 'center',
          color: COLORS.secondaryTextColor,
          ...FONTS.body3,
        }}>
        {"Please enable biometrics to access this feature"}
      </Text>
    );
  };

  const renderBiometricButtons = (): React.JSX.Element => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-around',alignItems:'center'}}>
      <CommonButton
        title={'Ok'}
        onPress={() => {
            notifyandBiomtericApiCall({
                variables: {
                  input: {
                    pointId: true,
                  },
                },
                onCompleted: response => {
                  if (response) {
                    console.log(response, 'biometricsresponse');
                    dispatch(
                        Action.biometricsModal(false),
                      );
                      setVisible(false)
                    checkAndEnableBiometrics();
                  }
                },
              });
        }}
        containerStyle={Styles.button}
        disableButton={true}
        linearBackground={[COLORS.lightGrey, COLORS.lightGrey]}
        textStyle={{
          color: COLORS.whiteColor,
          fontSize: moderateScale(14),
        }}
      />
        <CommonButton
        title={'Cancel'}
        onPress={() => {
            setVisible(false)
            dispatch(
                Action.biometricsModal(false),
              );
        }}
        containerStyle={Styles.button}
        disableButton={true}
        linearBackground={[COLORS.lightGrey, COLORS.lightGrey]}
        textStyle={{
          color: COLORS.whiteColor,
          fontSize: moderateScale(14),
        }}
      />
      
      </View>
    );
  };
  return (
    <ReactNativeModal
      isVisible={isModalVisible || visible}
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
          {renderBiometricButtons()}
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default BiometricsModal;

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

