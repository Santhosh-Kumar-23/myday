import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import SkeletonPlaceholder from '../skeletonPlaceholder';

const DpLoader: React.FC<{}> = ({}) => {
  return (
    <SkeletonPlaceholder>
      <View style={Styles.skelteonDpContainer}></View>
    </SkeletonPlaceholder>
  );
};

const Styles = StyleSheet.create({
  skelteonDpContainer: {
    borderRadius: moderateScale(60),
    height: moderateScale(50),
    width: moderateScale(50),
  },
});

export {DpLoader};
