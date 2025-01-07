import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {moderateScale, scale} from 'react-native-size-matters';
import {Elevation} from '../../constants/enums';
import {COLORS, FONTS, Fonts} from '../../constants/theme';

const data = [
  {
    value: 2500,
    frontColor: COLORS.primaryColor,
    spacing: 6,
    label: 'Sun',
  },
  {
    value: 2400,
    frontColor: COLORS.secondaryColor,
  },
  {
    value: 3500,
    frontColor: COLORS.primaryColor,
    spacing: 6,
    label: 'Mon',
  },
  {
    value: 3000,
    frontColor: COLORS.secondaryColor,
  },

  {
    value: 4500,
    frontColor: COLORS.primaryColor,
    spacing: 6,
    label: 'Tue',
  },
  {
    value: 4000,
    frontColor: COLORS.secondaryColor,
  },

  {
    value: 5200,
    frontColor: COLORS.primaryColor,
    spacing: 6,
    label: 'Wed',
  },
  {
    value: 4900,
    frontColor: COLORS.secondaryColor,
  },

  {
    value: 3000,
    frontColor: COLORS.primaryColor,
    spacing: 6,
    label: 'Thu',
  },
  {
    value: 2800,
    frontColor: COLORS.secondaryColor,
  },
  {
    value: 3000,
    frontColor: COLORS.primaryColor,
    spacing: 6,
    label: 'Fri',
  },
  {
    value: 2800,
    frontColor: COLORS.secondaryColor,
  },
  {
    value: 3000,
    frontColor: COLORS.primaryColor,
    spacing: 6,
    label: 'Sat',
  },
  {
    value: 2800,
    frontColor: COLORS.secondaryColor,
  },
];

interface DayData {
  frontColor: string;
  spacing?: number;
  label?: string;
  type: number;
  value: number;
}

interface Last7Days {
  last7Days: DayData[];
}

const AdminHomeGraph: React.FC<Last7Days> = ({last7Days}) => {
  let dataValues: any[] = [];
  const data = last7Days?.map((item, index) => {
    const checkEven: boolean = index % 2 === 0;

    item = {
      ...item,
      frontColor: checkEven ? COLORS.primaryColor : COLORS.secondaryColor,
    };

    dataValues.push(item.value);

    // console.log('DATA VALUES:::::::::', dataValues);

    if (checkEven) {
      item.spacing = 6;
    } else {
      delete item.label;
    }

    return item;
  });

  const maxValue: number =
    Array.isArray(dataValues) && dataValues.length > 0
      ? Math.max.apply(null, dataValues) || 1000
      : 1000;

  // console.log('AAAAAAAAAAAAAAAAAAA:::: ', Math.max.apply(null, dataValues));

  return (
    <View
      style={{
        margin: 5,
        padding: 16,
        borderRadius: 20,
        backgroundColor: COLORS.backgroundColour,
        marginBottom: 100,
        elevation: Elevation.cardContainerElevation,
        shadowOffset: {width: 0, height: 2},
        shadowColor: '#000',
        shadowOpacity: 0.2,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{color: COLORS.darkGrey, ...FONTS.body2}}>Activity</Text>
        <View>
          <View style={styles.analyticsView}>
            <View style={styles.profitView} />
            <Text style={styles.loss}>{'Profit Earning'}</Text>
          </View>
          <View style={styles.analyticsView}>
            <View
              style={[
                styles.profitView,
                {backgroundColor: COLORS.primaryColor},
              ]}
            />
            <Text style={styles.loss}>{'Amount Disperse'}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          paddingVertical: 30,
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <BarChart
          data={data}
          isAnimated
          barWidth={8}
          initialSpacing={10}
          spacing={25}
          barBorderRadius={4}
          showLine={false}
          hideRules={true}
          yAxisThickness={0}
          xAxisThickness={0}
          xAxisColor={COLORS.lightGrey}
          yAxisTextStyle={{
            color: COLORS.darkGrey,
            fontSize: moderateScale(12),
            fontFamily: Fonts.Medium,
          }}
          stepValue={Math.round(maxValue / 4)}
          maxValue={maxValue}
          noOfSections={6}
          // yAxisLabelTexts={['0', '1000', '2000', '3000', '4000', '5000']}
          labelWidth={40}
          yAxisLabelWidth={maxValue ? maxValue.toString().length * 7.5 : 30}
          xAxisLabelTextStyle={{
            color: COLORS.darkGrey,
            textAlign: 'center',
            fontSize: moderateScale(12),
            fontFamily: Fonts.Medium,
          }}
          showXAxisIndices={false}
          hideAxesAndRules={false}
        />
      </View>
    </View>
  );
};

export default AdminHomeGraph;
const styles = StyleSheet.create({
  analyticsView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profitView: {
    height: scale(10),
    width: scale(10),
    borderRadius: 50,
    backgroundColor: COLORS.secondaryColor,
    marginVertical: moderateScale(0),
    marginRight: moderateScale(5),
  },
  loss: {
    ...FONTS.body4,
    color: COLORS.grey,
  },
});
