import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {EmployeeLoanRequestSubHeader} from '../../components/employeeComponents/employeeLoanRequestSubHeader';
import {EmployeeNonLoanCard} from '../../components/employeeComponents/employeeNonLoanCard';
import EmployeeRequiredLoanAmountCard from '../../components/employeeComponents/employeeRequiredLoanAmountCard';
import {EmployeeCommonLoader} from '../../components/skeletonLoader/employeeCommonLoader';
import * as Interfaces from '../../constants/interfaces';
import * as String from '../../constants/string';
import {COLORS} from '../../constants/theme';

const EmployeeNewLoan: React.FC<{}> = (props: any) => {
  const {navigation} = props;
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  });
  const getEmployeeDetails = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.getEmployeeDetails,
  );
  const name = getEmployeeDetails?.first_name + getEmployeeDetails?.last_name;
  // const fullName:string[]=[getEmployeeDetails?.first_name,getEmployeeDetails?.last_name].join(" ")
  const fullName: string = [getEmployeeDetails?.first_name]?.join(' ');
  const salary = getEmployeeDetails?.compensation?.amount?? 0;
  console.log(getEmployeeDetails, 'salary');
  return (
    <SafeAreaView style={styles.container}>
      <EmployeeLoanRequestSubHeader
        title={String.NEW_LOAN}
        onPress={() => navigation.goBack()}
      />
      {!loader ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: COLORS.DashboardBackgroundColor,
          }}>
          <View style={{marginTop: 10}}>
            <EmployeeNonLoanCard
              showDivider={false}
              name={fullName}
              amount={getEmployeeDetails?.advanceSalaryLimit ?? 0}
              interest="0"
              onPress={() => {}}
            />
          </View>
          <View style={{marginTop: 20}}>
            <EmployeeRequiredLoanAmountCard />
          </View>
        </ScrollView>
      ) : (
        <EmployeeCommonLoader />
      )}
    </SafeAreaView>
  );
};

export default EmployeeNewLoan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DashboardBackgroundColor,
  },
});
