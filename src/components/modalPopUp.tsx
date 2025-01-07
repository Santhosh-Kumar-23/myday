import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import ReactNativeModal from 'react-native-modal';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, Fonts, deviceScreenHeight} from '../constants/theme';
import {commonStyles} from '../styles';

export type ImodalProps = {};

const ModalPopUp: React.FC<ImodalProps> = ({}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={{flex: 1}}>
      <Button title="Show modal" onPress={toggleModal} />
      <ReactNativeModal
        isVisible={isModalVisible}
        deviceHeight={deviceScreenHeight}
        statusBarTranslucent
        onBackdropPress={() => {
          setModalVisible(false);
        }}
      >
        <View style={Styles.container}>
          <Text style={Styles.heading1}>
            {`“Kreon Finance” would like to\n send you Notifications`}
          </Text>
          <Text style={Styles.heading2}>
            {`Notification may include alers, sounds
and icon Badges. These can be 
configured in settings.`}
          </Text>
          <View style={Styles.subContainer}>
            <Pressable
              onPress={toggleModal}
              style={[
                Styles.buttonContainer,
                commonStyles.backgroundColor('#e49470'),
              ]}>
              <Text style={Styles.buttonTitle}>Don't allow</Text>
            </Pressable>
            <Pressable
              style={[
                Styles.buttonContainer,
                commonStyles.backgroundColor(COLORS.primaryColor),
              ]}
              onPress={toggleModal}>
              <Text style={Styles.buttonTitle}>Allow</Text>
            </Pressable>
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    height: verticalScale(242),
    backgroundColor: 'rgba(222,222,225,255)',
    borderRadius: RFPercentage(2.2),
    paddingVertical: RFPercentage(5),
    paddingHorizontal: RFPercentage(3),
  },
  buttonContainer: {
    backgroundColor: 'blue',
    width: RFPercentage(17.0),
    height: RFPercentage(6.0),
    borderRadius: RFPercentage(3.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: COLORS.whiteColor,
    fontSize: RFPercentage(1.8),
    fontFamily: Fonts.Bold,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 40,
  },
  heading1: {
    fontFamily: Fonts.Bold,
    color: COLORS.blackColor,
    fontSize: RFPercentage(2.8),
    textAlign: 'center',
  },
  heading2: {
    fontFamily: Fonts.Medium,
    color: COLORS.darkGrey,
    fontSize: RFPercentage(2),
    textAlign: 'center',
    marginTop: RFPercentage(2),
  },
});

export {ModalPopUp};
