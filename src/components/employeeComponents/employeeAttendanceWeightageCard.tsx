import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {Elevation} from '../../constants/enums';
import * as String from '../../constants/string';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import {isIos} from '../../utlis/functions';

interface Attendance {
  month: string;
  totalDays: number;
  attendedDays: number;
  attendancePercentage: string;
}

export type IemployeeAttendanceWeightageCardProps = {
  attendancePercentage?: string;
  LastSixMonthsAttendance: Attendance[];
};

const EmployeeAttendanceWeightageCard: React.FC<
  IemployeeAttendanceWeightageCardProps
> = ({attendancePercentage, LastSixMonthsAttendance}) => {
  // console.log(
  //   'LastSixMonthsAttendance::::::::::::::::',
  //   LastSixMonthsAttendance,
  // );

  // console.log('attendancePercentage::::::::::::::::', attendancePercentage);

  const onlyAttendancePercentage = LastSixMonthsAttendance?.map(
    (item: any) => ({
      value: Number(item.attendancePercentage || 0),
    }),
  );

  const lineData = onlyAttendancePercentage;

  // Determine the last index in the data
  const lastIndex = lineData?.length - 1;

  // Add customization to highlight the last data point
  const customizedData = lineData?.map((item, index) => ({
    ...item,
    customDataPoint: () => {
      if (index === lastIndex) {
        return (
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 8,
              backgroundColor: COLORS.secondaryColor,
            }}
          />
        );
      }
      return (
        <View
          style={{
            width: 4,
            height: 4,
            borderRadius: 3,
            backgroundColor: 'transparent', // Make other points invisible
          }}
        />
      );
    },
  }));

  return (
    <View style={Styles.container}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text style={Styles.attendance}>{String.ATTENDANCE_WEIGHTAGE}</Text>
        <Text style={Styles.last}>{String.LAST_MONTHS}</Text>
      </View>
      <Text style={Styles.percentage}>{attendancePercentage ?? 0} %</Text>
      <View>
        <LineChart
          adjustToWidth
          animateOnDataChange={true}
          areaChart
          // curved
          isAnimated={true}
          xAxisThickness={0}
          yAxisThickness={0}
          maxValue={100}
          noOfSections={5}
          yAxisTextStyle={{
            color: COLORS.darkGrey,
            fontSize: moderateScale(12),
            fontFamily: Fonts.Medium,
          }}
          data={customizedData}
          stepValue={20}
          rulesColor={COLORS.grey}
          hideRules={true}
          height={RFPercentage(12)}
          spacing={57}
          initialSpacing={0}
          endSpacing={10}
          startFillColor={COLORS.secondaryColor}
          endFillColor={COLORS.secondaryColor}
          startOpacity={1}
          endOpacity={0.65}
        />
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    borderRadius: RFPercentage(2),
    elevation: Elevation.cardContainerElevation,
    backgroundColor: 'white',
    paddingTop: RFPercentage(2),
    paddingHorizontal: RFPercentage(2),
    marginHorizontal: RFPercentage(2),
    marginBottom: RFPercentage(3.0),
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  attendance: {
    ...FONTS.h3,
    color: COLORS.blackColor,
  },
  last: {
    ...FONTS.body3,
    color: COLORS.darkGrey,
  },
  percentage: {
    ...FONTS.amount,
    color: COLORS.darkGrey,
    marginBottom: RFPercentage(1),
  },
});
export {EmployeeAttendanceWeightageCard};
