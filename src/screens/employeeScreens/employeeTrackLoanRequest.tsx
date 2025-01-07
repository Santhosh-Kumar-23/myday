import {useQuery} from '@apollo/client';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  DeviceEventEmitter,
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import * as query from '../../api/query';
import EmployeeLoanPaymentHistoryCard from '../../components/employeeComponents/employeeLoanPaymentHistoryCard';
import {EmployeeLoanRequestSubHeader} from '../../components/employeeComponents/employeeLoanRequestSubHeader';
import EmployeeTrackLoanStatusCard from '../../components/employeeComponents/employeeTrackLoanStatusCard';
import {EmployeeCommonLoader} from '../../components/skeletonLoader/employeeCommonLoader';
import SkeletonPlaceholder from '../../components/skeletonPlaceholder';
import {Elevation, ModalErrorType} from '../../constants/enums';
import * as Images from '../../constants/images';
import * as Interfaces from '../../constants/interfaces';
import * as Strings from '../../constants/string';
import {COLORS, FONTS, Fonts, deviceScreenHeight} from '../../constants/theme';
import * as Actions from '../../redux/actions/actions';
import {isIos} from '../../utlis/functions';

const EmployeeTrackLoanRequest: React.FC<{}> = (props: any) => {
  const {navigation, route} = props;
  const navId = route?.params?.loanRequestId;
  // console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA:::::::::::::', navId);

  const [loader, setLoader] = useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const getEmployeeDetails = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.getEmployeeDetails,
  );

  const activeapplication = navId ? navId : (global as any).activeapplication;
  const loansAvailable = (global as any).isLoanAvailable;
  const dispatch = useDispatch();
  console.log(activeapplication, 'activeapplication::::::::::::::::::::');

  const {
    data: cardData,
    refetch,
    loading,
  } = useQuery(query.GET_LOAN_REQUEST_STATUS, {
    variables: {
      getLoanRequestId: activeapplication,
    },
    skip: !loansAvailable,
  });
  const {data: historyData, refetch: historyRefetch} = useQuery(
    query.GET_LOAN_LOG_HISTORY,
    {
      variables: {
        applicationId: activeapplication,
      },
      skip: !loansAvailable,
    },
  );

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  });
  useFocusEffect(
    useCallback(() => {
      refetch();
      historyRefetch();
      DeviceEventEmitter.emit('REFETCH_EMPLOYEE_DETAILS');
    }, [activeapplication]),
  );

  // console.log('activeapplication', activeapplication);
  // console.log('loansAvailable', JSON.stringify(cardData));
  // console.log('HistoryData', JSON.stringify(historyData?.getLogsByDate));
  const HistoryList = historyData?.getLogsByDate;
  const filterCardData = [
    ...(cardData?.getLoanRequest?.organizationApprovalStatus ?? []),
    ...(cardData?.getLoanRequest?.ownerApprovalStatus ?? []),
  ]
    .filter(item => item.enable)
    .map(item => ({
      id: item._id,
      loanProcess:
        item.__typename === 'OrganizationUserApprovalStatusFlow'
          ? `level ${item.level}`
          : item.label, // Conditional assignment
      application: cardData?.getLoanRequest?.applicationNo,
      date:
        item.__typename === 'OrganizationUserApprovalStatusFlow'
          ? item.createdAtemployeeDetailsQuery
          : item.updatedAt,
      loanAmount: cardData?.getLoanRequest?.loanAmount,
      loanStatus: item.status,
      loanType: cardData?.getLoanRequest?.loanType,
      source:
        item.__typename === 'OrganizationUserApprovalStatusFlow'
          ? `${item.name}`
          : `${cardData?.getLoanRequest?.label}`, // Determine source type
      orgLabel:
        item.__typename === 'OrganizationUserApprovalStatusFlow' && item.label,
    }));

  // console.log(filterCardData);

  // console.log('cardData', JSON.stringify(cardData));
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    historyRefetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={[styles.container]}>
      <EmployeeLoanRequestSubHeader
        title="Activity Overview"
        showBackArrow={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.secondaryColor, COLORS.primaryColor]}
          />
        }>
        {loansAvailable == true ? (
          <>
            {!loader ? (
              <View style={styles.mainView}>
                <View style={styles.headingRow}>
                  <Text style={styles.inProcessText}>{'In-Process Stage'}</Text>
                  <Pressable
                    style={{
                      backgroundColor: COLORS.whiteColor,
                      borderRadius: 8,
                      paddingVertical: 4,
                      paddingHorizontal: 12,
                      elevation: Elevation.inputElevation,
                      shadowColor: isIos ? COLORS.lightGrey : '#000',
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                      shadowOpacity: isIos ? 0.5 : 40,
                      shadowRadius: isIos ? 5 : 50.65,
                    }}
                    onPress={() =>
                      navigation.navigate(
                        Strings.EMPLOYEE_TRACK_LOAN_PROCESS_PIPELINE,
                        {
                          activeapplicationID: activeapplication,
                        },
                      )
                    }>
                    <Text style={styles.showpipeline}>{'Show Pipeline'}</Text>
                  </Pressable>
                </View>
                <EmployeeTrackLoanStatusCard data={filterCardData ?? []} />
                <EmployeeLoanPaymentHistoryCard
                  historyData={HistoryList ?? []}
                  onPress={
                    () =>
                      dispatch(
                        Actions.errorMessage({
                          errorMessage: 'update Coming Soon',
                          status: true,
                          errorType: ModalErrorType.Info,
                        }),
                      )
                    //navigation.navigate(Strings.EMPLOYEE_PAYMENT_HISTORY)
                  }
                  // onPressPaymentCard={() => {
                  //   dispatch(
                  //     Actions.errorMessage({
                  //       errorMessage: 'update Coming Soon',
                  //       status: true,
                  //       errorType: ModalErrorType.Info,
                  //     }),
                  //   );
                  //   // navigation.navigate(Strings.EMPLOYEE_PAYMENT_HISTORY);
                  // }}
                />
              </View>
            ) : (
              <>
                <SkeletonPlaceholder>
                  <View style={styles.loaderContainer}>
                    <View style={styles.l1sub}></View>
                    <View style={styles.l1sub}></View>
                  </View>
                </SkeletonPlaceholder>
                <EmployeeCommonLoader />
              </>
            )}
          </>
        ) : (
          <View style={styles.noActivityContainer}>
            <Image
              source={Images.NoActivityFound}
              style={{width: 300, height: 300}}
              resizeMode="contain"
            />
            <Text style={{...FONTS.h3, color: COLORS.blackColor}}>
              {'No Activity Available'}
            </Text>
            <Pressable
              onPress={() => {
                if (getEmployeeDetails?.attanceRecordExists == false) {
                  dispatch(
                    Actions.errorMessage({
                      errorMessage:
                        '"Your attendance data is missing. Please provide it to proceed with the loan application."',
                      status: true,
                      errorType: ModalErrorType.Info,
                    }),
                  );
                } else if (getEmployeeDetails?.advanceSalaryLimit < '1500') {
                  dispatch(
                    Actions.errorMessage({
                      errorMessage: 'Your are not eligible to raise Loan',
                      status: true,
                      errorType: ModalErrorType.Info,
                    }),
                  );
                } else {
                  navigation.navigate('LoanRequestStack', {
                    screen: Strings.EMPLOYEE_NEW_LOAN,
                    initial: false,
                    screenName: 'Apply for a Loan',
                  });
                }
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.secondaryColor,
                  marginVertical: 40,
                  textDecorationLine: 'underline',
                }}>
                {Strings.APPLY_FOR_A_NEW_LOAN}
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmployeeTrackLoanRequest;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DashboardBackgroundColor,
  },
  noActivityContainer: {
    height: deviceScreenHeight / 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  l1sub: {
    width: '40%',
    height: 20,
  },

  mainView: {
    paddingHorizontal: RFPercentage(1.5),
  },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: RFPercentage(2),
    paddingHorizontal: RFPercentage(1.5),
  },
  inProcessText: {
    fontFamily: Fonts.Bold,
    fontSize: RFValue(12),
    color: COLORS.darkGrey,
  },
  showpipeline: {
    fontFamily: Fonts.SemiBold,
    fontSize: RFValue(12),
    color: COLORS.secondaryColor,
  },
});
