import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import SkeletonPlaceholder from '../skeletonPlaceholder';

export type IorganiozationEmployeeViewPageLoaderProps = {};

const OrganiozationEmployeeViewPageLoader: React.FC<
  IorganiozationEmployeeViewPageLoaderProps
> = ({}) => {
  return (
    <SkeletonPlaceholder>
      <View style={Styles.container}>
        <View style={Styles.subContainer}>
          <View style={Styles.s1}>
            <View style={Styles.profileConatiner} />
          </View>
          <View style={Styles.s2}>
            <View style={Styles.t1}></View>
            <View style={Styles.t2}></View>
          </View>
          <View style={Styles.s3}>
            <View style={Styles.t3}></View>
          </View>
        </View>
        <View style={Styles.t4} />
        <View style={Styles.boxContainer}>
          <View style={Styles.box}></View>
          <View style={Styles.box}></View>
        </View>
        <View style={Styles.boxContainer}>
          <View style={Styles.box1}></View>
          <View style={Styles.box1}></View>
          <View style={Styles.box1}></View>
        </View>
        <View style={Styles.s4} />
        <View style={Styles.s4} />
      </View>
    </SkeletonPlaceholder>
  );
};

const Styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(20),
  },
  box: {
    marginTop: moderateScale(20),
    height: 120,
    width: '48%',
  },
  s4: {
    height: verticalScale(140),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(20),
  },
  box1: {
    marginTop: moderateScale(20),
    height: 50,
    width: '30%',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subContainer: {
    flexDirection: 'row',
    marginTop: moderateScale(20),
  },
  t4: {
    marginTop: moderateScale(20),
    height: moderateScale(15),
    width: '40%',
  },
  profileConatiner: {
    height: 60,
    width: 60,
    borderRadius: 60,
  },
  t3: {
    height: 15,
    width: '70%',
  },
  t1: {
    height: 10,
    width: '70%',
  },
  t2: {
    height: 10,
    width: '40%',
    marginTop: 10,
  },
  s1: {
    flex: 0.2,
    justifyContent: 'center',
  },
  s2: {
    flex: 0.6,
    justifyContent: 'center',
  },
  s3: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default OrganiozationEmployeeViewPageLoader;
