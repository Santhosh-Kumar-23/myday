import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import * as Strings from '../../constants/string';
import {
  AdminChangePassword,
  AdminEditProfile,
  AdminNotification,
  AdminSettings,
} from '../../screens/adminScreens';
import {navigatorOptions} from './navigationUtils';

const AdminProfileStack: React.FC<{}> = ({}) => {
  const AdminProfileStack = createStackNavigator();
  return (
    <AdminProfileStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Strings.ADMIN_SETTINGS}>
      <AdminProfileStack.Group>
        <AdminProfileStack.Screen
          name={Strings.ADMIN_SETTINGS}
          component={AdminSettings}
          options={(props) => ({
            ...navigatorOptions,
            ...{headerShown: false},
          })}
        />
        <AdminProfileStack.Screen
          name={Strings.ADMIN_EDIT_PROFILE}
          component={AdminEditProfile}
          options={(props) => ({
            ...navigatorOptions,
            ...{headerShown: false},
          })}
        />
        <AdminProfileStack.Screen
          name={Strings.ADMIN_CHANGE_PASSWORD}
          component={AdminChangePassword}
          options={(props) => ({
            ...navigatorOptions,
            ...{headerShown: false},
          })}
        />
        <AdminProfileStack.Screen
          name={Strings.ADMIN_NOTIFICATION}
          component={AdminNotification}
          options={(props) => ({
            ...navigatorOptions,
            ...{headerShown: false},
          })}
        />
      </AdminProfileStack.Group>
    </AdminProfileStack.Navigator>
  );
};

export {AdminProfileStack};
