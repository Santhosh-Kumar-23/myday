import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {commonStyles} from '../../styles';
import SkeletonPlaceholder from '../skeletonPlaceholder';

const EmployeeLoanHomeLoader: React.FC<{}> = ({}) => {
  return (
    <SkeletonPlaceholder>
      <View style={{marginHorizontal: moderateScale(20)}}>
        <View style={Styles.skelteonDpMainContainer}>
          <View style={[commonStyles.flex(0.2), {alignItems: 'flex-end'}]}>
            <View style={Styles.skelteonDpContainer}></View>
          </View>
          <View style={commonStyles.flex(0.8)}>
            <View style={Styles.t1}></View>
            <View style={Styles.t2}></View>
          </View>
        </View>
        <View style={Styles.container}></View>
        <View style={Styles.t3}></View>

        <View style={Styles.mainC1}>
          <View style={Styles.mainsub1}></View>
          <View style={Styles.mainSub2}></View>
        </View>
        <View style={Styles.mainc2}>
          <View style={{height: 190, width: '47%', bottom: 30}}></View>
          <View style={{height: 140, width: '47%', top: 20}}></View>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const Styles = StyleSheet.create({
  container: {
    height: moderateScale(180),
    marginTop: moderateScale(10),
  },
  skelteonDpMainContainer: {
    flexDirection: 'row-reverse',
    height: moderateScale(50),
    marginTop: moderateScale(15),
  },
  skelteonDpContainer: {
    borderRadius: moderateScale(60),
    height: moderateScale(50),
    width: moderateScale(50),
  },
  t1: {
    width: '80%',
    height: 20,
  },
  t2: {
    width: '60%',
    height: 20,
    marginTop: 10,
  },
  t3: {
    width: '30%',
    height: 20,
    marginTop: moderateScale(20),
  },
  mainC1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(20),
  },
  mainc2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainsub1: {
    height: 140,
    width: '47%',
  },
  mainSub2: {
    height: 190,
    width: '47%',
  },
});

export {EmployeeLoanHomeLoader};
