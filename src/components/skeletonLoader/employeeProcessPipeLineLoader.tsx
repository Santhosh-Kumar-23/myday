import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import SkeletonPlaceholder from '../skeletonPlaceholder';

export type IemployeeProcessPipeLineProps = {};

const EmployeeProcessPipeLineLoader: React.FC<
  IemployeeProcessPipeLineProps
> = ({}) => {
  return (
    <SkeletonPlaceholder>
      <View style={{marginHorizontal: moderateScale(25)}}>
        <View style={Styles.container}></View>
        <View style={Styles.container}></View>
        <View style={Styles.container}></View>
        <View style={Styles.container}></View>
        <View style={Styles.container}></View>
        <View style={Styles.container}></View>
        <View style={Styles.container}></View>
        <View style={Styles.container}></View>
        <View style={Styles.container}></View>
        <View style={Styles.container}></View>
        <View style={Styles.container}></View>
        <View style={Styles.container}></View>
        <View style={Styles.container}></View>
        <View style={Styles.container}></View>
      </View>
    </SkeletonPlaceholder>
  );
};
const Styles = StyleSheet.create({
  container: {
    height: 100,
    marginTop: moderateScale(15),
  },
});

export {EmployeeProcessPipeLineLoader};
