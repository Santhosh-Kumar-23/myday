import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Circle, Text as SVGText, Svg} from 'react-native-svg';
import {Elevation} from '../../constants/enums';
import * as cardStrings from '../../constants/string';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import {isIos} from '../../utlis/functions';

const EmployeePrincipleBalanceCard: React.FC<{}> = ({}) => {
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
    <View style={styles.container}>
      <View style={styles.topView}>
        <View>
          <Text style={styles.principleBalance}>
            {cardStrings.PRINCIPLE_BALANCE}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.amount}>{'₹ 9,000'}</Text>
            <Text style={styles.paise}>{'.00'}</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: COLORS.DashboardBackgroundColor,
            elevation: Elevation.cardContainerElevation,
            borderRadius: 100,
          }}>
          <CircularProgress
            size={60}
            strokeWidth={7}
            progressPercent={80}
            bgColor={COLORS.deepLightGrey}
            pgColor={COLORS.secondaryColor}
            text="100%"
            textSize={12}
            textColor={COLORS.secondaryColor}
            dotColor={COLORS.whiteColor}
          />
        </View>
      </View>
      <View style={styles.bottomView}>
        <View>
          <Text style={styles.loanAmount}>{cardStrings.UPCOMING_EVENT}</Text>
          <Text style={styles.Amount}>{'₹ 9,000'}</Text>
        </View>
        <View>
          <Text style={styles.loanAmount}>{cardStrings.AVERAGE_INTEREST}</Text>
          <Text style={styles.Amount}>{'7.62%'}</Text>
        </View>
        <View>
          <Text style={styles.loanAmount}>{cardStrings.LOAN_DATE}</Text>
          <Text style={styles.Amount}>{'Dec 2023'}</Text>
        </View>
      </View>
    </View>
  );
};

export default EmployeePrincipleBalanceCard;
const styles = StyleSheet.create({
  container: {
    // height: RFPercentage(23.8),
    backgroundColor: COLORS.whiteColor,
    // width: deviceWidth - 40,
    marginHorizontal: RFPercentage(2),
    borderRadius: RFPercentage(2),
    elevation: Elevation.cardContainerElevation,
    marginBottom: RFPercentage(3.0),
    padding: RFPercentage(2),
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  principleBalance: {
    ...FONTS.h3,
    color: COLORS.blackColor,
  },
  amount: {
    ...FONTS.amount,
    color: COLORS.secondaryColor,
    // marginLeft: RFPercentage(1.0),
  },
  paise: {
    ...FONTS.paise,
    color: COLORS.secondaryColor,
    // marginTop: RFPercentage(1.0),
  },
  bottomView: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFPercentage(2.5),
  },
  loanAmount: {
    ...FONTS.body2,
    color: COLORS.grey,
  },
  Amount: {
    color: COLORS.lightGrey,
    ...FONTS.body3,
    marginTop: RFPercentage(1.2),
  },
});
