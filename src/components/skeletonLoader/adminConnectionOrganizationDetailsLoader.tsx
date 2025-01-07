import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import SkeletonPlaceholder from '../skeletonPlaceholder';

export type IadminConnectionOrganizationDetailsLoaderProps = {};

const AdminConnectionOrganizationDetailsLoader: React.FC<
  IadminConnectionOrganizationDetailsLoaderProps
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
        <View style={Styles.c1}></View>
        <View style={Styles.c1}></View>
        <View style={Styles.c2}></View>
      </View>
    </SkeletonPlaceholder>
  );
};

const Styles = StyleSheet.create({
  c1: {
    height: 10,
    marginTop: moderateScale(25),
  },
  c2: {
    height: 150,
    marginTop: moderateScale(25),
  },
});

export {AdminConnectionOrganizationDetailsLoader};
