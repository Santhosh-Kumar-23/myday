import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import SkeletonPlaceholder from '../skeletonPlaceholder';

export type organizationDashboardLoaderProps = {
  showLoan: boolean;
};

const OrganizationDashboardLoader: React.FC<
  organizationDashboardLoaderProps
> = ({showLoan = false}) => {
  return (
    <SkeletonPlaceholder>
      <View style={Styles.conatiner}>
        <View style={Styles.s1Container}>
          <View style={Styles.s1}></View>
          <View style={Styles.s1}></View>
        </View>

        {showLoan && (
          <View>
            <View style={Styles.l1} />
            <View style={Styles.l1} />
            <View style={Styles.l1} />
            <View style={Styles.l1} />
            <View style={Styles.l1} />
            <View style={Styles.l1} />
            <View style={Styles.l1} />
            <View style={Styles.l1} />
            <View style={Styles.l1} />
          </View>
        )}

        <View style={Styles.s2} />
        <View style={Styles.s3} />
        <View style={Styles.s4} />
      </View>
    </SkeletonPlaceholder>
  );
};

const Styles = StyleSheet.create({
  conatiner: {
    marginHorizontal: moderateScale(20),
  },
  l1: {
    height: verticalScale(50),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(20),
  },

  s1: {
    height: 30,
    width: '35%',
    marginRight: moderateScale(15),
    marginTop: moderateScale(20),
    borderRadius: moderateScale(20),
  },
  s1Container: {
    flexDirection: 'row',
  },
  s2: {
    height: verticalScale(140),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(20),
  },
  s3: {
    height: verticalScale(160),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(20),
  },
  s4: {
    height: verticalScale(120),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(20),
  },
});

export default OrganizationDashboardLoader;
