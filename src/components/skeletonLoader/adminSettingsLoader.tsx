import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import SkeletonPlaceholder from '../skeletonPlaceholder';

export type IadminSettingsLoaderProps = {};

const AdminSettingsLoader: React.FC<IadminSettingsLoaderProps> = ({}) => {
  return (
    <SkeletonPlaceholder>
      <View style={{marginHorizontal: moderateScale(20)}}>
        <View style={Styles.t1}></View>
        <View style={Styles.t2}></View>
        <View style={Styles.text1}></View>
        <View style={Styles.option}></View>
        <View style={Styles.option}></View>
        <View style={Styles.option}></View>
        <View style={Styles.text1}></View>
        <View style={Styles.option}></View>
        <View style={Styles.option}></View>
        <View style={Styles.text1}></View>
        <View style={Styles.option}></View>
      </View>
    </SkeletonPlaceholder>
  );
};
const Styles = StyleSheet.create({
  t1: {
    height: 10,
    width: '70%',
    alignSelf: 'center',
    marginTop: moderateScale(20),
    marginVertical: moderateScale(10),
  },
  t2: {
    height: 10,
    width: '40%',
    alignSelf: 'center',
    marginBottom: moderateScale(15),
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

export {AdminSettingsLoader};
