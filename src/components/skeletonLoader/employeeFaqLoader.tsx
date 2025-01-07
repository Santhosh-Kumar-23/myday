import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import SkeletonPlaceholder from '../skeletonPlaceholder';

const EmployeeFaqLoader: React.FC<{}> = ({}) => {
  return (
    <SkeletonPlaceholder>
      <View style={{marginHorizontal: moderateScale(25)}}>
        <View style={Styles.t1}></View>
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
    height: 50,
    marginTop: moderateScale(15),
  },
  t1: {
    height: 20,
    marginTop: moderateScale(25),
    width: '50%',
  },
});

export {EmployeeFaqLoader};
