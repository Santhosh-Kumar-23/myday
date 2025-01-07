import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import SkeletonPlaceholder from '../skeletonPlaceholder';

export type IadminEmployeeDetailsProps = {};

const AdminEmployeeDetailsStyles: React.FC<
  IadminEmployeeDetailsProps
> = ({}) => {
  return (
    <SkeletonPlaceholder>
      <View style={Styles.container}>
        <View style={Styles.text}></View>
        <View style={Styles.boxContainer}>
          <View style={Styles.box1}></View>
          <View style={Styles.box1}></View>
          <View style={Styles.box1}></View>
        </View>
        <View style={Styles.contentContainer}>
          <View style={Styles.content}></View>
          <View style={Styles.content}></View>
        </View>
        <View style={Styles.contentContainer}>
          <View style={Styles.content}></View>
          <View style={Styles.content}></View>
        </View>
        <View style={Styles.contentContainer}>
          <View style={Styles.content}></View>
          <View style={Styles.content}></View>
        </View>
        <View style={Styles.contentContainer}>
          <View style={Styles.content}></View>
          <View style={Styles.content}></View>
        </View>
        <View style={Styles.contentContainer}>
          <View style={Styles.content}></View>
          <View style={Styles.content}></View>
        </View>
        <View style={Styles.contentContainer}>
          <View style={Styles.content}></View>
          <View style={Styles.content}></View>
        </View>
        <View style={Styles.card}></View>
      </View>
    </SkeletonPlaceholder>
  );
};

const Styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(20),
  },
  card: {
    height: 150,
  },
  text: {
    height: 10,
    width: '30%',
    alignSelf: 'center',
    marginTop: moderateScale(10),
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: moderateScale(15),
  },
  content: {
    height: 12,
    width: '45%',
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
});

export {AdminEmployeeDetailsStyles};
