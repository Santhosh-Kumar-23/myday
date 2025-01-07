import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {EmployeeChooseNonLoanCard} from '../../components/employeeComponents/employeeChooseLoanCard';
import {EmployeeNonLoanRequestCard} from '../../components/employeeComponents/employeeLoanRequestCard';
import {EmployeeLoanRequestSubHeader} from '../../components/employeeComponents/employeeLoanRequestSubHeader';
import {EmployeeCommonLoader} from '../../components/skeletonLoader/employeeCommonLoader';
import {ModalErrorType} from '../../constants/enums';
import * as Interfaces from '../../constants/interfaces';
import * as String from '../../constants/string';
import {COLORS} from '../../constants/theme';
import * as Actions from '../../redux/actions/actions';

const EmployeeNonLoanRequest: React.FC<{}> = (props: any) => {
  const {navigation} = props;
  const [loader, setLoader] = useState<boolean>(true);
  const getEmployeeDetails = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.getEmployeeDetails,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  });
  return (
    <SafeAreaView style={Styles.container}>
      <EmployeeLoanRequestSubHeader
        title={String.EMPLOYEE_LOAN}
        onPress={() => navigation.goBack()}
        showBackArrow={!false}
      />
      {!loader ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            backgroundColor: COLORS.DashboardBackgroundColor,
            flexGrow: 1,
          }}>
          <EmployeeNonLoanRequestCard
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
                navigation.navigate(String.EMPLOYEE_NEW_LOAN);
              }
            }}
            onPressResumeApplication={() =>
              navigation.navigate(String.EMPLOYEE_LOAN_REQUEST)
            }
          />
          <EmployeeChooseNonLoanCard hideButton={!true} />
        </ScrollView>
      ) : (
        <EmployeeCommonLoader />
      )}
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DashboardBackgroundColor,
  },
});

export {EmployeeNonLoanRequest};
