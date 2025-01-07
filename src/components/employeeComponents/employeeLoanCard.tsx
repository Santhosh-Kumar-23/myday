import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {Elevation} from '../../constants/enums';
import * as cardStrings from '../../constants/string';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import {isIos} from '../../utlis/functions';

const EmployeeLoanCard: React.FC<{}> = ({}) => {
  const salary = (global as any).employeeSalary;
  const loan_Amount = (global as any).employeeLoanAmount ?? 0;
  const renderDivider = (): React.JSX.Element => {
    return <View style={styles.dividerStyle} />;
  };
  return (
    <View style={styles.cardContainer}>
      <View style={styles.balanceView}>
        <View>
          <Text style={styles.BalanceText}>{cardStrings.BALANCE}</Text>
          <View style={styles.INR_view}>
            <View style={styles.circle} />
            <Text style={styles.rate}>
              {cardStrings.INR}
              {salary}.00
            </Text>
          </View>
        </View>
        <View>
          <Text style={[styles.BalanceText, {color: COLORS.pinkColor}]}>
            {cardStrings.MONTHLY}
          </Text>
          <View style={styles.INR_view}>
            <View
              style={[styles.circle, {backgroundColor: COLORS.pinkColor}]}
            />
            <Text style={styles.rate}>
              {cardStrings.INR}
              {loan_Amount}.00
            </Text>
          </View>
        </View>
      </View>
      {renderDivider()}
      <View style={styles.secondView}>
        <Text style={styles.loanText}>{cardStrings.LOAN_PACKAGE}</Text>
        <Pressable style={styles.tellmeButton}>
          <Text style={styles.tellme_Text}>{'Tell me more'}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EmployeeLoanCard;
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.whiteColor,
    marginHorizontal: RFPercentage(2),
    borderRadius: RFPercentage(2),
    padding: RFPercentage(2),
    marginTop: moderateScale(40),
    elevation: Elevation.cardContainerElevation,
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  balanceView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RFPercentage(1),
  },
  BalanceText: {
    ...FONTS.body2,
    color: COLORS.primaryColor,
  },
  INR_view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(1.5),
  },
  circle: {
    height: RFPercentage(1.5),
    width: RFPercentage(1.5),
    borderRadius: RFPercentage(1.5),
    marginRight: RFPercentage(1.5),
    backgroundColor: COLORS.primaryColor,
  },
  rate: {
    ...FONTS.h4,
    color: COLORS.blackColor,
  },
  dividerStyle: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginVertical: RFPercentage(2),
  },
  secondView: {
    paddingHorizontal: RFPercentage(1.0),
  },
  loanText: {
    ...FONTS.body3,
    color: COLORS.blackColor,
    // marginHorizontal: RFPercentage(1),
    // marginLeft: RFPercentage(2.3),
  },
  tellmeButton: {
    marginHorizontal: RFPercentage(0.3),
    marginTop: RFPercentage(1.3),
  },
  tellme_Text: {
    ...FONTS.body3,
    fontFamily: Fonts.ExtraBold,
    textDecorationLine: 'underline',
    color: COLORS.secondaryColor,
  },
});
