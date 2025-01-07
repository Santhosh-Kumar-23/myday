import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import SkeletonPlaceholder from '../skeletonPlaceholder';

export type IadminLoanAmountDisturbutedandRecoveredLoaderProps = {};

const AdminLoanAmountDisturbutedandRecoveredLoader: React.FC<
  IadminLoanAmountDisturbutedandRecoveredLoaderProps
> = ({}) => {
  return (
    <SkeletonPlaceholder>
      <View style={{marginHorizontal: moderateScale(25)}}>
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
  c1: {
    height: 150,
    marginTop: 15,
  },
});

export {AdminLoanAmountDisturbutedandRecoveredLoader};
