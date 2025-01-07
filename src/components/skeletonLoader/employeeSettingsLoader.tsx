import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {commonStyles} from '../../styles';
import SkeletonPlaceholder from '../skeletonPlaceholder';

const EmployeeSettingsLoader: React.FC<{}> = ({}) => {
  return (
    <SkeletonPlaceholder>
      <View style={{marginHorizontal: moderateScale(25)}}>
        <View style={Styles.skelteonDpMainContainer}>
          <View style={commonStyles.flex(0.2)}>
            <View style={Styles.skelteonDpContainer}></View>
          </View>
          <View style={[commonStyles.flex(0.8)]}></View>
        </View>
        <View style={Styles.text1}></View>
        <View style={Styles.option}></View>
        <View style={Styles.option}></View>
        <View style={Styles.option}></View>
        <View style={Styles.option}></View>
        <View style={Styles.option}></View>

        <View style={Styles.text1}></View>
        <View style={Styles.option}></View>

        <View style={Styles.text1}></View>
        <View style={Styles.option}></View>
        <View style={Styles.option}></View>
      </View>
    </SkeletonPlaceholder>
  );
};

const Styles = StyleSheet.create({
  skelteonDpMainContainer: {
    flexDirection: 'row',
    height: moderateScale(50),
    marginTop: moderateScale(20),
    marginBottom: moderateScale(25),
  },
  skelteonDpContainer: {
    borderRadius: moderateScale(60),
    height: moderateScale(50),
    width: moderateScale(50),
  },
  text1: {
    width: '40%',
    height: moderateScale(15),
    marginTop: 15,
  },
  option: {
    height: moderateScale(30),
    marginTop: moderateScale(15),
  },
});

export {EmployeeSettingsLoader};
