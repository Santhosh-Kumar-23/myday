import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import * as Strings from '../../constants/string';
import {
  AdminLoanAmountDisturbutedandRecovered,
  AdminLoanRecoveredCompany,
} from '../../screens/adminScreens';
import {navigatorOptions} from './navigationUtils';

const AdminLoanRecoveredStack: React.FC<{}> = ({}) => {
  const AdminLoanRecoveredStack = createStackNavigator();
  return (
    <AdminLoanRecoveredStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Strings.ADMIN_LOAN_RECOVERED_COMPANY}>
      <AdminLoanRecoveredStack.Group>
        <AdminLoanRecoveredStack.Screen
          name={Strings.ADMIN_LOAN_RECOVERED_COMPANY}
          component={AdminLoanRecoveredCompany}
          options={(props) => ({
            ...navigatorOptions,
            ...{headerShown: false},
          })}
        />
        <AdminLoanRecoveredStack.Screen
          name={Strings.ADMIN_LOAN_RECOVERED_AND_DISTURBUTED}
          component={AdminLoanAmountDisturbutedandRecovered}
          options={(props) => ({
            ...navigatorOptions,
            ...{headerShown: false},
          })}
        />
      </AdminLoanRecoveredStack.Group>
    </AdminLoanRecoveredStack.Navigator>
  );
};

export {AdminLoanRecoveredStack};
