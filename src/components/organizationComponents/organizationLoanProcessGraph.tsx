import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {moderateScale, scale} from 'react-native-size-matters';
import {Elevation} from '../../constants/enums';
import * as Interface from '../../constants/interfaces';
import * as Strings from '../../constants/string';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import {isIos} from '../../utlis/functions';

const OrganizationLoanProcessGraph: React.FC<
  Interface.OrganizationLoanProcessGraphProps
> = ({data}) => {
  const [chartData, setChartData] = useState<
    Interface.OrganizationLoanProcessGraphProps[]
  >([]);

  useEffect(() => {
    if (data) {
      setChartData(data);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{Strings.LOAN_PROCESS_STATISTICS}</Text>
      {chartData.length > 0 ? (
        <BarChart
          isAnimated
          barBorderRadius={5}
          // barBorderTopLeftRadius={4}
          // barBorderTopRightRadius={4}
          // barBorderBottomLeftRadius={4}
          // barBorderBottomRightRadius={4}
          height={100}
          width={scale(260)}
          spacing={33}
          overflowTop={20}
          noOfSections={2}
          stackBorderRadius={20}
          sideWidth={20}
          labelWidth={10}
          xAxisIndicesWidth={10}
          barWidth={9}
          dashWidth={0}
          xAxisLabelTextStyle={{
            color: COLORS.darkGrey,
            fontSize: moderateScale(10),
            fontFamily: Fonts.Bold,
          }}
          stackData={chartData}
          showValuesAsTopLabel
          showLine={false}
          xAxisColor={COLORS.whiteColor}
          yAxisColor={COLORS.whiteColor}
          showXAxisIndices={false}
          hideAxesAndRules={false}
          hideYAxisText={true}
        />
      ) : (
        <ActivityIndicator size={'small'} color={COLORS.secondaryColor} />
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <View style={styles.redDot} />
        <Text style={styles.loan}>{Strings.LOAN_REQUEST_RECEIVED}</Text>
        <View style={styles.blueDot} />
        <Text style={styles.loan}>{Strings.LOAN_APPROVED}</Text>
      </View>
    </View>
  );
};

export default OrganizationLoanProcessGraph;

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(16),
    elevation: Elevation.cardContainerElevation,
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.whiteColor,
    padding: moderateScale(15),
    marginBottom: moderateScale(5),
    shadowColor: isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  heading: {
    marginHorizontal: moderateScale(10),
    fontFamily: Fonts.Bold,
    fontSize: moderateScale(14),
    color: COLORS.blackColor,
  },
  blueDot: {
    width: scale(10),
    height: scale(10),
    borderRadius: moderateScale(5),
    backgroundColor: COLORS.secondaryColor,
    marginTop: moderateScale(5),
  },
  redDot: {
    width: scale(10),
    height: scale(10),
    borderRadius: moderateScale(5),
    backgroundColor: COLORS.primaryColor,
    marginTop: moderateScale(5),
  },
  loan: {
    ...FONTS.body5,
    fontFamily: Fonts.SemiBold,
    color: COLORS.secondaryTextColor,
    marginHorizontal: moderateScale(10),
    marginTop: moderateScale(5),
  },
  noDataText: {
    ...FONTS.body5,
    color: COLORS.secondaryTextColor,
    marginTop: moderateScale(20),
    textAlign: 'center',
  },
});
