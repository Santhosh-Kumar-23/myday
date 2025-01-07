import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StatusBar} from 'react-native';
import * as Strings from '../../constants/string';
import {COLORS} from '../../constants/theme';
import {
  OrganizationChangePassword,
  OrganizationEditProfile,
  OrganizationNotification,
  OrganizationSettings,
  OrganizationTerms,
} from '../../screens/organizationScreens';
import {navigatorOptions} from './navigationUtils';

const OrganizationSettingsStack: React.FC<{}> = ({}) => {
  const OrganizationSettingsStack = createStackNavigator();
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.secondaryColor}
      />
      <OrganizationSettingsStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={Strings.ORGANIZATION_SETTINGS}>
        <OrganizationSettingsStack.Group>
          <OrganizationSettingsStack.Screen
            name={Strings.ORGANIZATION_SETTINGS}
            component={OrganizationSettings}
            options={(props) => ({
              ...navigatorOptions,
              ...{headerShown: false},
            })}
          />
          <OrganizationSettingsStack.Screen
            name={Strings.ORGANIZATION_EDIT_PROFILE}
            component={OrganizationEditProfile}
            options={(props) => ({
              ...navigatorOptions,
              ...{headerShown: false},
            })}
          />
          <OrganizationSettingsStack.Screen
            name={Strings.ORGANIZATION_TERMS}
            component={OrganizationTerms}
            options={(props) => ({
              ...navigatorOptions,
              ...{headerShown: false},
            })}
          />
          <OrganizationSettingsStack.Screen
            name={Strings.ORGANIZATION_CHANGE_PASSOWRD}
            component={OrganizationChangePassword}
            options={(props) => ({
              ...navigatorOptions,
              ...{headerShown: false},
            })}
          />
          <OrganizationSettingsStack.Screen
            name={Strings.ORGANIZATION_NOTIFICATION}
            component={OrganizationNotification}
            options={(props) => ({
              ...navigatorOptions,
              ...{headerShown: false},
            })}
          />
        </OrganizationSettingsStack.Group>
      </OrganizationSettingsStack.Navigator>
    </>
  );
};

export {OrganizationSettingsStack};
