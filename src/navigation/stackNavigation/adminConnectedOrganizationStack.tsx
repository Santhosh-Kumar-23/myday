import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import * as Strings from '../../constants/string';
import {
  AdminConnectionOrganization,
  AdminEmployeeDetails,
  AdminLoanProcessList,
  ConnectionOrganizationDetails,
} from '../../screens/adminScreens';
import {navigatorOptions} from './navigationUtils';

const AdminConnectedOrganizationStack: React.FC<{}> = ({}) => {
  const AdminConnectedOrganizationStack = createStackNavigator();
  return (
    <AdminConnectedOrganizationStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Strings.ADMIN_CONNECTION_ORGANIZATION}>
      <AdminConnectedOrganizationStack.Group>
        <AdminConnectedOrganizationStack.Screen
          name={Strings.ADMIN_CONNECTION_ORGANIZATION}
          component={AdminConnectionOrganization}
          options={(props) => ({
            ...navigatorOptions,
            ...{headerShown: false},
          })}
        />
        <AdminConnectedOrganizationStack.Screen
          name={Strings.ADMIN_LOAN_PROCESS_LIST}
          component={AdminLoanProcessList}
          options={(props) => ({
            ...navigatorOptions,
            ...{headerShown: false},
          })}
        />
        <AdminConnectedOrganizationStack.Screen
          name={Strings.ADMIN_CONNECTION_ORGANIZATION_DETAILS}
          component={ConnectionOrganizationDetails}
          options={(props) => ({
            ...navigatorOptions,
            ...{headerShown: false},
          })}
        />
        <AdminConnectedOrganizationStack.Screen
          name={Strings.ADMIN_EMPLOYEE_DETAILS}
          component={AdminEmployeeDetails}
          options={(props) => ({
            ...navigatorOptions,
            ...{headerShown: false},
          })}
        />
      </AdminConnectedOrganizationStack.Group>
    </AdminConnectedOrganizationStack.Navigator>
  );
};

export {AdminConnectedOrganizationStack};
