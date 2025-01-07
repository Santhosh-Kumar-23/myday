import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale, scale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {Elevation} from '../../constants/enums';
import * as Images from '../../constants/images';
import * as Interfaces from '../../constants/interfaces';
import {COLORS, Fonts} from '../../constants/theme';
import {
  capitalizeFirstLetter,
  convertDateToWord,
  isIos,
  removeUnderScore,
  shortenApplicationNo,
} from '../../utlis/functions';

interface EmployeeDashboardDueCardProps {
  percentage?: string;
  status?: string;
  nextStatus?: string;
  approvedDate?: string;
  LoanType?: string;
  Amount?: string | number;
  ApprovalType?: string;
  name?: string;
  applicationNo?: string;
  orgLabel?: string;
  ApproverName?: string;
  globalStatus?: string;
}

const EmployeeDashboardDueCard: React.FC<EmployeeDashboardDueCardProps> = ({
  applicationNo,
  status,
  Amount,
  ApprovalType,
  LoanType,
  approvedDate,
  name,
  nextStatus,
  orgLabel,
  ApproverName,
  percentage,
  globalStatus,
}) => {
  const getEmployeeDetails = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.getEmployeeDetails,
  );
  const employeeFirstName: string = getEmployeeDetails?.first_name ?? '';

  console.log('Application No:', applicationNo);
  console.log('Status:', status);
  console.log('GlobalStaus', globalStatus);
  console.log('Amount:', Amount);
  console.log('Approval Type:', ApprovalType);
  console.log('Loan Type:', LoanType);
  console.log('Approved Date:', approvedDate);
  console.log('Name:', name);
  console.log('Next Status:', nextStatus);
  console.log('Org Label:', orgLabel);
  console.log('Approver Name:', ApproverName);

  const renderApplicationNo = (): React.JSX.Element => {
    return (
      <View
        style={{
          flexDirection: 'row',
          // elevation: Elevation.cardContainerElevation,
          borderRadius: 12,
          // padding: 8,
          // paddingHorizontal: 18,
          backgroundColor: COLORS.whiteColor,
        }}>
        <View style={[styles.c1, {flex: 0.15}]}>
          <View style={styles.imgView}>
            <Image source={Images.Kreon} style={styles.img} />
          </View>
        </View>
        <View style={[styles.c2, {flex: 0.85}]}>
          <Text style={styles.t1}>
            Application no :{' '}
            <Text style={styles.t2}>{shortenApplicationNo(applicationNo)}</Text>
          </Text>
          <Text style={styles.t2}>
            {capitalizeFirstLetter(employeeFirstName)}
          </Text>
        </View>
      </View>
    );
  };

  const renderProgress = (): React.JSX.Element => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View style={[styles.c1]}>
          <View
            style={[
              styles.percentageContainer,
              {
                backgroundColor:
                  ApproverName == 'Rejected'
                    ? '#ff3333'
                    : COLORS.secondaryColor,
              },
            ]}>
            <Text style={styles.percentageText}>{percentage}</Text>
          </View>
        </View>
        <View style={styles.c2}>
          <View style={[styles.containerr]}>
            <LinearGradient
              colors={
                ApproverName == 'Rejected'
                  ? ['#ff3333', '#ff3333']
                  : [COLORS.secondaryColor, COLORS.secondaryColor]
              }
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[styles.bar, {width: percentage, height: 100}]}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderOtherDetails1 = (): React.JSX.Element => {
    console.log('Approver Name====>:', ApproverName);
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View style={styles.subC1}>
          <Text style={[styles.t1, {fontSize: moderateScale(10)}]}>Status</Text>
          <Text
            style={[
              styles.t2,
              {
                color:
                  ApproverName === 'Rejected'
                    ? COLORS.errorRed
                    : COLORS.blackColor,
              },
            ]}
            numberOfLines={2}>
            {globalStatus == 'Disbursed'
              ? 'Disbursed'
              : ApprovalType && orgLabel === 'Disbursement'
              ? 'Ready For Disbursement'
              : ApproverName === 'Rejected'
              ? 'Rejected'
              : ApprovalType
              ? `${removeUnderScore(ApprovalType)}${
                  ApproverName &&
                  ApproverName !== 'null' &&
                  ApproverName !== undefined
                    ? ` - ${
                        ApproverName === 'Rejected'
                          ? 'Rejected'
                          : removeUnderScore(ApproverName)
                      }`
                    : ''
                }`
              : 'Pending'}
          </Text>
        </View>
        <View style={styles.subC2}>
          <Text style={[styles.t1, {fontSize: moderateScale(10)}]}>Date</Text>
          <Text style={styles.t2} numberOfLines={1}>
            {convertDateToWord(approvedDate) ?? '-'}
          </Text>
        </View>
        <View style={styles.subC3}>
          <Text style={[styles.t1, {fontSize: moderateScale(10)}]}>
            {nextStatus !== 'Disbursement - kreon'
              ? 'Next Approval'
              : 'Final Approval'}
          </Text>
          <Text style={styles.t2} numberOfLines={2}>
            {nextStatus == 'undefined - undefined'
              ? '-'
              : removeUnderScore(nextStatus)}
          </Text>
        </View>
      </View>
    );
  };
  const renderOtherDetails2 = (): React.JSX.Element => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View style={styles.subC1}>
          <Text style={[styles.t1, {fontSize: moderateScale(10)}]}>
            Advance Type
          </Text>
          <Text style={styles.t2} numberOfLines={1}>
            {LoanType ?? '-'}
          </Text>
        </View>
        <View style={styles.subC2}>
          <Text style={[styles.t1, {fontSize: moderateScale(10)}]}>
            Advance
          </Text>
          <Text style={styles.t2} numberOfLines={1}>
            ₹{Amount ?? '-'}
          </Text>
        </View>
        <View style={styles.subC3}>
          <Text style={[styles.t1, {fontSize: moderateScale(10)}]}>
            Approval Type
          </Text>
          <Text style={styles.t2} numberOfLines={1}>
            {orgLabel ?? '-'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.cardContainer}>
      <View style={{flex: 0.5}}>
        {renderApplicationNo()}
        {renderProgress()}
      </View>
      <View style={{flex: 0.5}}>
        {renderOtherDetails1()}
        {renderOtherDetails2()}
      </View>
    </View>
  );
};

export default EmployeeDashboardDueCard;

const styles = StyleSheet.create({
  containerr: {
    width: '100%',
    borderRadius: RFPercentage(2),
    overflow: 'hidden',
    position: 'relative',
    height: 20,
    justifyContent: 'center',

    // elevation: 10,
    backgroundColor: '#E9E9E9',
  },
  percentageText: {
    color: 'white',
    fontSize: 12,
    fontFamily: Fonts.SemiBold,
  },
  percentageContainer: {
    backgroundColor: COLORS.secondaryColor,
    elevation: Elevation.cardContainerElevation,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFPercentage(2),
    padding: 3,
    shadowColor: isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  bar: {
    borderRadius: 5,
  },
  progressBarContainer: {
    backgroundColor: '#E9E9E9',
    elevation: Elevation.cardContainerElevation,
  },
  cardContainer: {
    backgroundColor: COLORS.whiteColor,
    marginHorizontal: RFPercentage(2),
    borderRadius: RFPercentage(2),
    padding: RFPercentage(2.55),
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
  t1: {
    color: COLORS.darkGrey,
    fontSize: moderateScale(12),
    fontFamily: Fonts.Regular,
  },
  t2: {
    color: COLORS.blackColor,
    fontSize: moderateScale(12),
    fontFamily: Fonts.SemiBold,
  },
  imgView: {
    flex: 0.2,
    justifyContent: 'center',
    borderRadius: moderateScale(10),
  },
  img: {
    height: scale(35),
    width: scale(35),
    borderRadius: 50,
  },
  c1: {
    flex: 0.2,
  },
  c2: {
    flex: 0.8,
    justifyContent: 'center',
  },
  subC1: {
    flex: 0.4,
  },
  subC2: {
    flex: 0.3,
  },
  subC3: {
    flex: 0.3,
  },
});
