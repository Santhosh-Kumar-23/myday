import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Circle, Text as SVGText, Svg} from 'react-native-svg';
import {Elevation} from '../../constants/enums';
import * as Strings from '../../constants/string';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import {isIos} from '../../utlis/functions';
const progressPercent = 80;

export type propsData = {
  onPressLoanDetails: () => {};
  overViewDetails: {
    received: number | string;
    approved: number | string;
    approvedPercentage: number | string;
  };
};
const OrganizationHomeOverViewCard: React.FC<propsData> = ({
  onPressLoanDetails,
  overViewDetails,
}) => {
  const totalReceivedLoans: number | string =
    overViewDetails?.received ?? Strings.ZERO;
  const totalApprovedLoans: number | string =
    overViewDetails?.approved ?? Strings.ZERO;
  const totalApprovedPercentage: number | string =
    overViewDetails?.approvedPercentage ?? Strings.ZERO;

  const CircularProgress = (props: any) => {
    const {size, strokeWidth, text} = props;
    const radius = (size - strokeWidth) / 2;
    const circum = radius * 2 * Math.PI;
    const svgProgress = 100 - props.progressPercent;
    const dotRadius = strokeWidth / 2; // Radius of the dot
    const dotColor = props.dotColor ? props.dotColor : '#ff0000'; // Color of the dot

    // Calculate the ending point position of the progress circle
    const progressAngle =
      (props.progressPercent / 100) * 2 * Math.PI - Math.PI / 2;
    const dotX = size / 2 + radius * Math.cos(progressAngle);
    const dotY = size / 2 + radius * Math.sin(progressAngle);

    return (
      <View style={{margin: 10}}>
        <Svg width={size} height={size}>
          {/* Background Circle */}
          <Circle
            stroke={props.bgColor ? props.bgColor : '#f2f2f2'}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            {...{strokeWidth}}
          />

          {/* Progress Circle */}
          <Circle
            stroke={props.pgColor ? props.pgColor : '#3b5998'}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeDasharray={`${circum} ${circum}`}
            strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
            strokeLinecap="round"
            transform={`rotate(-90, ${size / 2}, ${size / 2})`}
            {...{strokeWidth}}
          />

          {/* Dot at the ending point */}
          <Circle fill={dotColor} cx={dotX} cy={dotY} r={dotRadius} />

          {/* Text */}
          <SVGText
            fontFamily={Fonts.SemiBold}
            fontSize={props.textSize ? props.textSize : '10'}
            x={size / 2}
            y={size / 2 + (props.textSize ? props.textSize / 2 - 1 : 5)}
            textAnchor="middle"
            fill={props.textColor ? props.textColor : '#333333'}>
            {text}
          </SVGText>
        </Svg>
      </View>
    );
  };
  return (
    <View style={styles.cardContainer}>
      <View style={styles.leftView}>
        <Text style={styles.text1}>{Strings.TOTAL_LOANS}</Text>
        <Text style={styles.totalLoans}>
          {totalReceivedLoans} {Strings.LOANS}
        </Text>
        <Text style={styles.approved}>
          You marked {`${totalApprovedLoans}/${totalReceivedLoans}`}{' '}
          {Strings.LOANS} are approved
        </Text>
        <Pressable style={styles.overViewBtn} onPress={onPressLoanDetails}>
          <Text style={styles.overViewText}>{Strings.LOANS} details</Text>
        </Pressable>
      </View>

      <View style={styles.rightView}>
        <CircularProgress
          size={100}
          strokeWidth={10}
          progressPercent={totalApprovedPercentage}
          bgColor={COLORS.grey}
          pgColor={COLORS.secondaryColor}
          text={`${totalApprovedPercentage}%`}
          textSize={12}
          textColor={COLORS.secondaryColor}
          dotColor={
            totalApprovedPercentage == 100
              ? COLORS.secondaryColor
              : COLORS.whiteColor
          }
        />
        <Text style={styles.kireon}>Powered by Kreon</Text>
      </View>
    </View>
  );
};

export default OrganizationHomeOverViewCard;
const styles = StyleSheet.create({
  cardContainer: {
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(16),
    elevation: Elevation.cardContainerElevation,
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.backgroundColour,
    marginBottom: moderateScale(5),
    flexDirection: 'row',
    shadowColor: isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  leftView: {
    flex: 0.5,
    paddingLeft: moderateScale(20),
  },
  text1: {
    fontFamily: Fonts.Bold,
    fontSize: moderateScale(14),
    color: COLORS.blackColor,
    marginVertical: moderateScale(4),
    marginTop: moderateScale(10),
  },
  totalLoans: {
    ...FONTS.h4,
    color: COLORS.darkGrey,
    marginVertical: moderateScale(4),
  },
  approved: {
    ...FONTS.body3,
    color: COLORS.textColor,
    marginVertical: moderateScale(4),
  },
  overViewBtn: {
    backgroundColor: COLORS.secondaryColor,
    borderRadius: moderateScale(20),
    marginVertical: moderateScale(20),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(3),
    justifyContent: 'center',
    elevation: moderateScale(2),
    alignItems: 'center',
  },
  overViewText: {
    ...FONTS.body4,
    color: COLORS.whiteColor,
  },
  rightView: {
    flex: 0.5,
    paddingLeft: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  kireon: {
    fontSize: 12,
    fontFamily: Fonts.SemiBold,
    color: COLORS.darkGrey,
    marginTop: moderateScale(30),
    marginRight: moderateScale(20),
    alignSelf: 'flex-end',
  },
});
