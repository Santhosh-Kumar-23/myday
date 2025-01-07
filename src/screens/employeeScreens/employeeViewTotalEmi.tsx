import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {EmployeeLoanRequestSubHeader} from '../../components/employeeComponents/employeeLoanRequestSubHeader';
import {EmployeeViewTotalEmiCard} from '../../components/employeeComponents/employeeViewTotalEmiCard';
import {EmployeeViewTotalEmiDetailCard} from '../../components/employeeComponents/employeeViewTotalEmiDetailCard';
import {EmployeeCommonLoader} from '../../components/skeletonLoader/employeeCommonLoader';
import * as Interfaces from '../../constants/interfaces';
import * as String from '../../constants/string';
import {COLORS} from '../../constants/theme';

export type IemployeeViewTotalEmiProps = {};

const EmployeeViewTotalEmi: React.FC<IemployeeViewTotalEmiProps> = (
  props: any,
) => {
  const {navigation} = props;
  const {loanAmount, interest, tenure} = props.route.params;
  const [loader, setLoader] = useState<boolean>(true);
  // console.log('details', loanAmount, interest, tenure);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  });
  const getEmployeeDetails = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.getEmployeeDetails,
  );

  const employeeFirstName: string = getEmployeeDetails?.first_name ?? '';
  const employeeLastName: string = getEmployeeDetails?.last_name ?? '';
  const employeeProfile: string = getEmployeeDetails?.profile ?? '';

  console.log('EMPLOYEE PROFILE::::::', employeeProfile);

  return (
    <SafeAreaView style={Styles.container}>
      <EmployeeLoanRequestSubHeader
        title="Total EMI Details"
        onPress={() => navigation.goBack()}
      />
      {!loader ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            backgroundColor: COLORS.DashboardBackgroundColor,
          }}>
          <EmployeeViewTotalEmiCard
            name={employeeFirstName}
            lastName={employeeLastName}
            profile={employeeProfile}
            typeOfLoan={String.EMPLOYEE_LOAN}
          />
          <EmployeeViewTotalEmiDetailCard
            interest={interest}
            tenure={tenure}
            loanAmount={loanAmount}
            onPressFaq={() => {
              navigation.navigate(String.FAQ);
            }}
            onPress={(): void => {
              navigation.navigate(String.EMPLOYEE_UPLOAD_DOCUMENTS);
            }}
          />
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

export {EmployeeViewTotalEmi};
