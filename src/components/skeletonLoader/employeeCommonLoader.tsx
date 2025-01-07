import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import SkeletonPlaceholder from '../skeletonPlaceholder';

export type IemployeeCommonLoaderProps = {};

const EmployeeCommonLoader: React.FC<IemployeeCommonLoaderProps> = ({}) => {
  return (
    <SkeletonPlaceholder>
      <View style={{marginHorizontal: moderateScale(20)}}>
        <View style={Styles.c1}></View>
        <View style={Styles.c2}></View>
      </View>
    </SkeletonPlaceholder>
  );
};

const Styles = StyleSheet.create({
  c1: {
    height: moderateScale(150),
    marginTop: moderateScale(20),
    borderRadius: 10,
  },
  c2: {
    height: moderateScale(750),
    marginTop: moderateScale(20),
    borderRadius: 10,
  },
});

export {EmployeeCommonLoader};
