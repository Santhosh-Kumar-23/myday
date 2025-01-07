import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Elevation} from '../../constants/enums';
import * as Strings from '../../constants/string';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import {countReducer, isIos} from '../../utlis/functions';

export interface PropsData {
  employeeCountDetails: {
    totalEmployee: number;
    totalActiveEmployee: number;
    employeeIncreasePercentage: number | string;
    employeeActivePercentage: number | string;
  };
}

const OrganizationHomeTotalEmployeeCard: React.FC<PropsData> = ({
  employeeCountDetails,
}) => {
  const totalEmployee = employeeCountDetails?.totalEmployee ?? Strings.ZERO;
  const totalActiveEmployee =
    employeeCountDetails?.totalActiveEmployee ?? Strings.ZERO;
  const employeeIncreasePercentage =
    employeeCountDetails?.employeeIncreasePercentage ?? Strings.ZERO;
  const employeeActivePercentage =
    employeeCountDetails?.employeeActivePercentage ?? Strings.ZERO;

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.count}>{Strings.TOTAL_EMPLOYEE_COUNT}</Text>
        <Text style={styles.days}>{Strings.LAST_SEVEN_DAYS}</Text>
      </View>
      <View style={styles.headingBox}>
        <View style={styles.card}>
          <Text style={styles.countText}>{countReducer(totalEmployee)}</Text>
          <View style={{justifyContent: 'space-between'}}>
            <Text style={styles.totalCount}>{Strings.TOTAL_COUNT}</Text>
            <Text
              style={
                styles.percentage
              }>{`${employeeIncreasePercentage}%`}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.countText}>
            {countReducer(totalActiveEmployee)}
          </Text>
          <View>
            <Text style={styles.totalCount}>{Strings.ACTIVE_IN_APP}</Text>
            <Text
              style={styles.percentage}>{`${employeeActivePercentage}%`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrganizationHomeTotalEmployeeCard;
const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(16),
    elevation: Elevation.cardContainerElevation,
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.backgroundColour,
    marginBottom: moderateScale(100),
    padding: moderateScale(8),
    paddingHorizontal: moderateScale(15),
    shadowColor: isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  count: {
    fontFamily: Fonts.Bold,
    fontSize: moderateScale(14),
    color: COLORS.blackColor,
  },
  days: {
    ...FONTS.body4,
    color: COLORS.primaryColor,
  },
  headingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: moderateScale(20),
  },
  card: {
    height: verticalScale(55),
    width: scale(120),
    backgroundColor: COLORS.dimSecondaryColor,
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    justifyContent: 'space-around',
  },
  countText: {
    fontFamily: Fonts.Bold,
    fontSize: moderateScale(20),
    color: COLORS.whiteColor,
  },
  totalCount: {
    ...FONTS.body5,
    color: COLORS.whiteColor,
  },
  percentage: {
    color: '#24FF00',
    ...FONTS.body4,
  },
});
