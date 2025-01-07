import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import HeaderTitle from '../components/headerTitle';
import CommonButton from '../components/commonButton';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../constants/theme';

const CustomFallback = (props: { error: Error, resetError: () => void }) => {
  const { error, resetError } = props;
  const renderButton = (): React.JSX.Element => {
    return (
      <CommonButton
        title={'Restart'}
        onPress={resetError}
        containerStyle={styles.button}
        disableButton={true}
        linearBackground={[COLORS.lightGrey, COLORS.lightGrey]}
        textStyle={{
          color: COLORS.whiteColor,
          fontSize: moderateScale(14),
        }}
      />
    );
  };
  return (
    <ReactNativeModal isVisible={true}>
      <View style={styles.modalContent}>
        <HeaderTitle/>
        <Text style={styles.errorTitle}>Oops Something happened!</Text>
         {renderButton()}
        {/* <Text style={styles.errorMessage}>{error.toString()}</Text> */}
        {/* <Button onPress={resetError} title="Try again" /> */}

      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: scale(120),
    height: verticalScale(30),
    marginVertical: moderateScale(8),
    marginRight: moderateScale(8),
  },
});

export { CustomFallback };
