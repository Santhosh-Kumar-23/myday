import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {AdminHome} from '../../screens/adminScreens';
import {navigatorOptions} from './navigationUtils';

const AdminStack: React.FC<{}> = ({}) => {
  const AdminStack = createStackNavigator();
  return (
    <AdminStack.Navigator screenOptions={{headerShown: false}}>
      <AdminStack.Group>
        <AdminStack.Screen
          name="AdminHome"
          component={AdminHome}
          options={(props) => ({
            ...navigatorOptions,
            ...{headerShown: false},
          })}
        />
      </AdminStack.Group>
    </AdminStack.Navigator>
  );
};

export {AdminStack};
