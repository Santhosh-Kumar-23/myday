import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import HeaderTitle from '../../components/headerTitle';
import * as String from '../../constants/string';
import {COLORS} from '../../constants/theme';
import {
  EmployeeFAQ,
  EmployeeLoanRequest,
  EmployeeLoanRequestReviewDetails,
  EmployeeNewLoan,
  EmployeeNonLoanRequest,
  EmployeeThankyou,
  EmployeeUploadDocuments,
  EmployeeViewTotalEmi,
} from '../../screens/employeeScreens';
import {navigatorOptions} from './navigationUtils';

const EmployeeLoanRequestStack: React.FC<{}> = ({}) => {
  const EmployeeLoanRequestStack = createStackNavigator();
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.secondaryColor}
        translucent={true}
      />
      <EmployeeLoanRequestStack.Navigator
        initialRouteName={String.EMPLOYEE_NON_LOAN_REQUEST}
        screenOptions={{
          headerTitleAlign: 'center',
          headerLeft: () => null,
          headerTitle: () => (
            <View style={{flex: 1}}>
              <View style={{marginTop: RFPercentage(1.5)}}>
                <HeaderTitle
                  color1={COLORS.whiteColor}
                  color2={COLORS.whiteColor}
                />
              </View>
            </View>
          ),

          headerStyle: {
            backgroundColor: COLORS.secondaryColor,
            elevation: 0,
            borderBottomWidth: 0,
            shadowColor: 'transparent',
          },
        }}>
        <EmployeeLoanRequestStack.Group>
          <EmployeeLoanRequestStack.Screen
            name={String.EMPLOYEE_NON_LOAN_REQUEST}
            component={EmployeeNonLoanRequest}
            options={navigatorOptions}
          />
          <EmployeeLoanRequestStack.Screen
            name={String.EMPLOYEE_VIEW_TOTAL_EMI}
            component={EmployeeViewTotalEmi}
            options={navigatorOptions}
          />
          <EmployeeLoanRequestStack.Screen
            name={String.EMPLOYEE_NEW_LOAN}
            component={EmployeeNewLoan}
            options={navigatorOptions}
          />
          <EmployeeLoanRequestStack.Screen
            name={String.EMPLOYEE_UPLOAD_DOCUMENTS}
            component={EmployeeUploadDocuments}
            options={navigatorOptions}
          />
          <EmployeeLoanRequestStack.Screen
            name={String.EMPLOYEE_LOAN_REQUEST_REVIEW_DETAILS}
            component={EmployeeLoanRequestReviewDetails}
            options={navigatorOptions}
          />
          <EmployeeLoanRequestStack.Screen
            name={String.EMPLOYEE_LOAN_REQUEST}
            component={EmployeeLoanRequest}
            options={navigatorOptions}
          />
          <EmployeeLoanRequestStack.Screen
            name={String.FAQ}
            component={EmployeeFAQ}
            options={navigatorOptions}
          />
          <EmployeeLoanRequestStack.Screen
            name={String.EMPLOYEE_THANKYOU}
            options={{
              header: () => null,
            }}
            component={EmployeeThankyou}
          />
        </EmployeeLoanRequestStack.Group>
      </EmployeeLoanRequestStack.Navigator>
    </>
  );
};

export {EmployeeLoanRequestStack};
