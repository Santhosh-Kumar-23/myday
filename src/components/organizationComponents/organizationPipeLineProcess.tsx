import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Elevation} from '../../constants/enums';
import * as String from '../../constants/string';
import {COLORS, FONTS} from '../../constants/theme';

interface PipeLineProcessInterface {
  _id: string;
  title: string;
  description: string | null;
  label: string;
  isCompleted: boolean;
  updatedAt: string;
}

interface employeePipelineProcessList {
  data: PipeLineProcessInterface[];
}

const OrganizationPipeLineProcess: React.FC<employeePipelineProcessList> = ({
  data,
}) => {
  const RenderItem = ({item, index}: any) => {
    return (
      <View style={Styles.subContainer}>
        <View style={Styles.s1}>
          <View
            style={[
              Styles.stepIndicatorContainer,
              {
                backgroundColor: item.isCompleted
                  ? COLORS.primaryColor
                  : COLORS.lightGrey,
              },
            ]}>
            <Text style={Styles.stepIndicatorContainerText}>{index + 1}</Text>
          </View>
          {index == data.length - 1 ? null : (
            <View style={[Styles.dotLine]}>
              <View
                style={[
                  Styles.borderLine,
                  {
                    borderColor: item.isCompleted
                      ? COLORS.primaryColor
                      : COLORS.lightGrey,
                  },
                ]}></View>
            </View>
          )}
        </View>
        <View style={Styles.s2}>
          <Text
            style={[
              Styles.piplineProcessText,
              {color: item.isCompleted ? COLORS.blackColor : COLORS.lightGrey},
            ]}>
            {item.isCompleted ? item.description : item.title}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={Styles.container}>
      <Text style={Styles.pipeLine}>{String.PIPELINE_PROCESS}</Text>
      {data.length !== 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          data={data}
          renderItem={RenderItem}
        />
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: COLORS.grey,
              fontSize: 13,
              fontWeight: '900',
              marginBottom: 20,
            }}>
            {String.NO_DATA_FOUND}
          </Text>
        </View>
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    marginHorizontal: RFPercentage(2),
    borderRadius: RFPercentage(2),
    backgroundColor: COLORS.whiteColor,
    elevation: Elevation.cardContainerElevation,

    paddingTop: moderateScale(20),
  },
  stepIndicatorContainerText: {
    color: COLORS.whiteColor,
    ...FONTS.body5,
  },
  stepIndicatorContainer: {
    height: moderateScale(23),
    width: moderateScale(23),
    borderRadius: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  s1: {
    flex: 0.18,
    alignItems: 'center',
  },

  s2: {
    flex: 0.88,
    paddingHorizontal: moderateScale(10),
  },
  subContainer: {
    flexDirection: 'row',
    height: verticalScale(40),
  },
  dotLine: {
    alignSelf: 'center',
  },
  borderLine: {
    width: 2,
    height: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  pipeLine: {
    ...FONTS.h3,
    color: COLORS.darkGrey,
    textAlign: 'left',
    marginLeft: moderateScale(15),
    marginBottom: moderateScale(12),
  },
  piplineProcessText: {
    ...FONTS.e1,
    color: COLORS.darkGrey,
  },
});

export default OrganizationPipeLineProcess;
