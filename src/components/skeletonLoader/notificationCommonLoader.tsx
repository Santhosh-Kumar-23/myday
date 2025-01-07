import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import SkeletonPlaceholder from '../skeletonPlaceholder';

export type InotificationCommonLoaderProps = {};

const NotificationCommonLoader: React.FC<
  InotificationCommonLoaderProps
> = ({}) => {
  return (
    <SkeletonPlaceholder>
      <View style={{marginHorizontal: moderateScale(15)}}>
        <View style={Styles.t1} />
        <View style={Styles.c1} />
        <View style={Styles.c1} />
        <View style={Styles.c1} />
        <View style={Styles.c1} />
        <View style={Styles.c1} />
        <View style={Styles.c1} />
        <View style={Styles.c1} />
        <View style={Styles.c1} />
        <View style={Styles.c1} />
        <View style={Styles.c1} />
      </View>
    </SkeletonPlaceholder>
  );
};

const Styles = StyleSheet.create({
  t1: {
    height: 12,
    width: '30%',
    marginTop: moderateScale(25),
  },
  c1: {
    height: 60,
    marginTop: moderateScale(15),
  },
});

export {NotificationCommonLoader};
