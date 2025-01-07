import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {commonStyles} from '../../styles';
import SkeletonPlaceholder from '../skeletonPlaceholder';

const EmployeeEditProfileLoader: React.FC<{}> = ({}) => {
  return (
    <SkeletonPlaceholder>
      <View style={{marginHorizontal: moderateScale(25)}}>
        <View style={Styles.skelteonDpMainContainer}>
          <View style={commonStyles.flex(0.2)}>
            <View style={Styles.skelteonDpContainer}></View>
          </View>
          <View style={commonStyles.flex(0.8)}></View>
        </View>
        <View
          style={[
            commonStyles.ViewCenter('', 'center'),
            {marginTop: moderateScale(20)},
          ]}>
          <View style={Styles.profile}></View>
          <View style={Styles.text1}></View>
        </View>
        <View style={Styles.inputContainer}>
          <View style={Styles.text2}></View>
          <View style={Styles.input}></View>
        </View>
        <View style={Styles.inputContainer}>
          <View style={Styles.text2}></View>
          <View style={Styles.input}></View>
        </View>
        <View style={Styles.inputContainer}>
          <View style={Styles.text2}></View>
          <View style={Styles.input}></View>
        </View>
        <View style={Styles.inputContainer}>
          <View style={Styles.text2}></View>
          <View style={Styles.input}></View>
        </View>
        <View style={Styles.inputContainer}>
          <View style={Styles.text2}></View>
          <View style={Styles.input}></View>
        </View>
        <View style={Styles.inputContainer}>
          <View style={Styles.text2}></View>
          <View style={Styles.input}></View>
        </View>
        <View style={Styles.inputContainer}>
          <View style={Styles.text2}></View>
          <View style={Styles.input}></View>
        </View>
        <View style={Styles.inputContainer}>
          <View style={Styles.text2}></View>
          <View style={Styles.input}></View>
        </View>
        <View style={Styles.inputContainer}>
          <View style={Styles.text2}></View>
          <View style={Styles.input}></View>
        </View>
        <View style={Styles.inputContainer}>
          <View style={Styles.text2}></View>
          <View style={Styles.input}></View>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const Styles = StyleSheet.create({
  skelteonDpMainContainer: {
    flexDirection: 'row',
    height: moderateScale(50),
    marginTop: moderateScale(15),
  },
  skelteonDpContainer: {
    borderRadius: moderateScale(60),
    height: moderateScale(50),
    width: moderateScale(50),
  },
  profile: {
    height: moderateScale(85),
    width: moderateScale(85),
    borderRadius: moderateScale(60),
  },
  text1: {
    height: 20,
    width: '50%',
    marginTop: moderateScale(5),
    marginBottom: moderateScale(10),
  },
  text2: {
    width: '30%',
    height: 20,
    borderRadius: RFPercentage(0.5),
  },
  input: {
    height: moderateScale(45),
    marginTop: 10,
    borderRadius: RFPercentage(1),
  },
  inputContainer: {
    marginTop: moderateScale(15),
  },
});

export default EmployeeEditProfileLoader;
