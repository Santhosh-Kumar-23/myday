import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import SkeletonPlaceholder from '../skeletonPlaceholder';

export type IadminCommonLoaderProps = {};

const AdminCommonLoader: React.FC<IadminCommonLoaderProps> = ({}) => {
  return (
    <SkeletonPlaceholder>
      <View style={{marginHorizontal: moderateScale(25)}}>
        <View style={Styles.t1}></View>
        <View style={Styles.c1}></View>
        <View style={Styles.c1}></View>
        <View style={Styles.c1}></View>
        <View style={Styles.c1}></View>
        <View style={Styles.c1}></View>
        <View style={Styles.c1}></View>
        <View style={Styles.c1}></View>
        <View style={Styles.c1}></View>
        <View style={Styles.c1}></View>
      </View>
    </SkeletonPlaceholder>
  );
};

const Styles = StyleSheet.create({
  t1: {
    height: 15,
    marginTop: 20,
    width: '70%',
  },
  c1: {
    height: 150,
    marginTop: 15,
  },
});

export {AdminCommonLoader};
