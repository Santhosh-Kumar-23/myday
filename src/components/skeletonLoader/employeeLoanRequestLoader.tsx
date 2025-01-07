import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {commonStyles} from '../../styles';
import SkeletonPlaceholder from '../skeletonPlaceholder';

const EmployeeLoanRequestLoader: React.FC<{}> = ({}) => {
  return (
    <SkeletonPlaceholder>
      <View style={{marginHorizontal: moderateScale(20)}}>
        <View>
          <View style={Styles.skelteonDpMainContainer}>
            <View style={commonStyles.flex(0.8)}></View>
            <View style={[commonStyles.flex(0.2), {alignItems: 'flex-end'}]}>
              <View style={Styles.skelteonDpContainer}></View>
            </View>
          </View>
        </View>
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
  skelteonDpMainContainer: {
    flexDirection: 'row',
    height: moderateScale(50),
    marginTop: moderateScale(15),
  },
  skelteonDpContainer: {
    height: moderateScale(50),
    width: moderateScale(50),
  },
  container: {
    height: 100,
    marginTop: moderateScale(15),
  },
});
export {EmployeeLoanRequestLoader};
