import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StatusBar} from 'react-native';
import * as Strings from '../../constants/string';
import {COLORS} from '../../constants/theme';
import {
  OrganizationEmployeeView,
  OrganizationLoanProcessList,
} from '../../screens/organizationScreens';
import {navigatorOptions} from './navigationUtils';

const OrganizationLoanStack = createStackNavigator();
const OrganizationLoanReviewStack: React.FC<{}> = ({}) => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.secondaryColor}
      />
      <OrganizationLoanStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={Strings.ORGANIZATION_LOAN_PROCESS_LIST}>
        <OrganizationLoanStack.Screen
          name={Strings.ORGANIZATION_LOAN_PROCESS_LIST}
          component={OrganizationLoanProcessList}
          options={(props) => ({
            ...navigatorOptions,
            ...{headerShown: false},
          })}
        />
        <OrganizationLoanStack.Screen
          name={Strings.ORGANIZATION_EMPLOYEE_VIEW}
          component={OrganizationEmployeeView}
          options={(props) => ({
            ...navigatorOptions,
            ...{headerShown: false},
          })}
        />
      </OrganizationLoanStack.Navigator>
    </>
  );
};

export default OrganizationLoanReviewStack;
