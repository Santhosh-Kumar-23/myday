import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StatusBar} from 'react-native';
import * as Strings from '../../constants/string';
import {COLORS} from '../../constants/theme';
import {OrganizationHome} from '../../screens/organizationScreens';
import {navigatorOptions} from './navigationUtils';

const OrganizationStack: React.FC<{}> = ({}) => {
  const OrganizationStack = createStackNavigator();
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.secondaryColor}
      />
      <OrganizationStack.Navigator screenOptions={{headerShown: false}}>
        <OrganizationStack.Group>
          <OrganizationStack.Screen
            name={Strings.ORGANIZATION_HOME}
            component={OrganizationHome}
            options={[navigatorOptions, {headerShown: false}]}
          />
        </OrganizationStack.Group>
      </OrganizationStack.Navigator>
    </>
  );
};

export {OrganizationStack};
