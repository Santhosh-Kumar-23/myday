import {useQuery} from '@apollo/client';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, SafeAreaView, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {moderateScale} from 'react-native-size-matters';
import * as Query from '../../api/query';
import {EmployeeLoanRequestSubHeader} from '../../components/employeeComponents/employeeLoanRequestSubHeader';
import EmployeePipeLineCard from '../../components/employeeComponents/employeePipeLineCard';
import EmployeeStepIndicator from '../../components/employeeComponents/employeeStepIndicator';
import {EmployeeCommonLoader} from '../../components/skeletonLoader/employeeCommonLoader';
import {COLORS} from '../../constants/theme';
import * as Functions from '../../utlis/functions';

const EmployeeTrackLoanProcessPipeLine: React.FC<{}> = (props: any) => {
  const {navigation, route} = props;
  const [loader, setLoader] = useState<boolean>(true);
  const {activeapplicationID} = route.params;
  const [refreshing, setRefreshing] = React.useState(false);
  const activeapplication = (global as any).activeapplication;
  // console.log('activeapplication:::::::::', (global as any).activeapplication);
  // console.log('activeapplicationID:::::::::::::', activeapplicationID);

  const {
    data: pipelineData,
    loading,
    refetch,
  } = useQuery(Query.EMPLOYEE_SHOW_PIPELINE, {
    variables: {
      applicationId: activeapplicationID
        ? activeapplicationID
        : activeapplication,
    },
    onCompleted: () => {
      setRefreshing(false);
      // console.log('pipelineData::::::::', JSON.stringify(pipelineData));
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  const mainStatus: string = pipelineData?.getLoanPipelineLogs?.status ?? '';

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  // if (loading || !pipelineData) {
  //   // Show loader if data is still loading or is undefined
  //   return <EmployeeCommonLoader />;
  // }

  // Extracting values with null/undefined safety
  const {
    applicationNo,
    loanType,
    org_name: orgName,
    pipelineLogs = [],
  } = pipelineData?.getLoanPipelineLogs || {};

  const applicationNumber = Functions.getDataValue(applicationNo);
  const loanTypeValue = Functions.getDataValue(loanType);
  const orgNameValue = Functions.getDataValue(orgName);
  console.log(
    'pipelineLogs::::::::::::::::::::::::',
    JSON.stringify(pipelineLogs),
  );

  const onRefresh = () => {
    setRefreshing(true);
    // console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    refetch();
  };

  return (
    <SafeAreaView style={styles.container}>
      <EmployeeLoanRequestSubHeader
        title="Process Pipeline"
        onPress={() => {
          navigation.goBack();
        }}
      />
      {!loading ? (
        <ScrollView
          nestedScrollEnabled={true}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.secondaryColor, COLORS.primaryColor]}
            />
          }>
          <View style={styles.mainView}>
            <EmployeePipeLineCard
              CompanyName={orgNameValue}
              applicationNumber={applicationNumber}
              type={loanTypeValue}
            />
            <EmployeeStepIndicator
              data={pipelineLogs}
              mainStatus={mainStatus}
            />
          </View>
        </ScrollView>
      ) : (
        <EmployeeCommonLoader />
      )}
    </SafeAreaView>
  );
};

export default EmployeeTrackLoanProcessPipeLine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DashboardBackgroundColor,
  },
  mainView: {
    paddingHorizontal: moderateScale(16),
    marginTop: moderateScale(10),
  },
});
