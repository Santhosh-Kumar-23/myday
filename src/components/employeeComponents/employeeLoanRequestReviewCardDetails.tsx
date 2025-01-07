import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import {Elevation} from '../../constants/enums';
import * as Interfaces from '../../constants/interfaces';
import * as String from '../../constants/string';
import {COLORS, FONTS} from '../../constants/theme';
import {checkNullOrUndefined, isIos} from '../../utlis/functions';

export type IemployeeLoanRequestReviewCardDetailsProps = {
  processingFee?: any;
  processingFeePercentage?: any;
  creditAmount?: any;
};

const EmployeeLoanRequestReviewCardDetails: React.FC<
  IemployeeLoanRequestReviewCardDetailsProps
> = ({processingFee = '', creditAmount = '', processingFeePercentage = ''}) => {
  const getEmployeeLoanDetails = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.employeeLoanDetails,
  );
  // console.log(getEmployeeLoanDetails, 'getEmployeeLoanDetails');

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>{String.REVIEW_DETAILS}</Text>
      <Text style={Styles.subTitle}>{String.EMPLOYEE_LOAN}</Text>
      <View style={Styles.textContainer}>
        <Text style={Styles.text1}>{String.LOAN_AMOUNT}</Text>
        <Text
          style={
            Styles.text2
          }>{`₹ ${getEmployeeLoanDetails?.loanAmount}.00`}</Text>
      </View>
      <View style={Styles.textContainer}>
        <Text style={Styles.text1}>{`Processing Fees ( ${checkNullOrUndefined(
          processingFeePercentage,
        )}% Deduction)`}</Text>
        <Text style={Styles.text2}>{`₹ ${checkNullOrUndefined(
          processingFee,
        ).toFixed(2)}`}</Text>
      </View>

      <View style={Styles.textContainer}>
        <Text style={Styles.text1}>{String.RATE_OF_INTEREST}</Text>
        <Text
          style={Styles.text2}>{`@${getEmployeeLoanDetails?.interest}%`}</Text>
      </View>

      <View style={Styles.textContainer}>
        <Text style={Styles.text1}>{String.TENURE}</Text>
        <Text
          style={Styles.text2}>{`${getEmployeeLoanDetails.tenure} Month`}</Text>
      </View>
      <View style={Styles.textContainer}>
        <Text style={Styles.text1}>{String.EMI_AMOUNT}</Text>
        <Text
          style={
            Styles.text2
          }>{`₹ ${getEmployeeLoanDetails?.loanAmount}.00`}</Text>
      </View>
      <View style={Styles.textContainer}>
        <Text style={Styles.text1}>{String.ADVANCE_AMOUNT}</Text>
        <Text style={Styles.text2}>{`₹ ${checkNullOrUndefined(
          creditAmount,
        ).toFixed(2)}`}</Text>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.whiteColor,
    marginHorizontal: RFPercentage(2),
    borderRadius: RFPercentage(2),
    padding: RFPercentage(2),
    marginTop: RFPercentage(2),
    elevation: Elevation.cardContainerElevation,
    shadowColor: isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  title: {
    ...FONTS.h3,
    color: COLORS.darkGrey,
  },
  subTitle: {
    ...FONTS.body3,
    color: COLORS.lightGrey,
    marginBottom: RFPercentage(1),
  },
  text1: {
    ...FONTS.body4,
    color: COLORS.lightGrey,
  },
  text2: {
    ...FONTS.body4,
    color: COLORS.secondaryColor,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFPercentage(1),
  },
});

export {EmployeeLoanRequestReviewCardDetails};
