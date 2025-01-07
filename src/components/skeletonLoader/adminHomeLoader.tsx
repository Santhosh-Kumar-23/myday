import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import SkeletonPlaceholder from '../skeletonPlaceholder';

const AdminHomeLoader: React.FC<{}> = ({}) => {
  return (
    <SkeletonPlaceholder>
      <View style={{marginHorizontal: moderateScale(20)}}>
        <View style={Styles.mainC1}>
          <View style={Styles.mainsub1}></View>
          <View style={Styles.mainSub2}></View>
        </View>
        <View style={Styles.mainC1}>
          <View style={Styles.mainsub3}></View>
          <View style={Styles.mainsub4}></View>
        </View>
        <View style={Styles.mainC1}>
          <View style={Styles.mainsub5}></View>
          <View style={Styles.mainsub6}></View>
        </View>
        <View style={Styles.mainc2}></View>
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
    marginTop: moderateScale(10),
  },
  mainC1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
    borderRadius: moderateScale(20),
  },
  mainc2: {
    height: 200,
    top: -25,
  },
  mainsub1: {
    height: 140,
    width: '47%',
  },
  mainSub2: {
    height: 140,
    width: '47%',
    marginTop: moderateScale(65),
  },
  mainsub3: {
    height: 140,
    width: '47%',
    bottom: 60,
  },
  mainsub4: {
    height: 140,
    width: '47%',
    top: 10,
  },
  mainsub5: {
    height: 210,
    width: '47%',
    bottom: 50,
  },
  mainsub6: {
    height: 140,
    width: '47%',
    top: 20,
  },
});

export {AdminHomeLoader};
