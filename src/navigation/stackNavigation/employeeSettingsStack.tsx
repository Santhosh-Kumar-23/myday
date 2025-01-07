import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import HeaderTitle from '../../components/headerTitle';
import * as String from '../../constants/string';
import {COLORS} from '../../constants/theme';
import {
  EmployeeAutoPaymentSetup,
  EmployeeChangePassword,
  EmployeeDeleteAccount,
  EmployeeEditProfile,
  EmployeeNotification,
  EmployeeProofVerification,
  EmployeeSettings,
  EmployeeVerification,
  EmployeeVerificationOTP,
  Terms,
} from '../../screens/employeeScreens';
import {navigatorOptions} from './navigationUtils';

const EmployeeSettingsStack: React.FC<{}> = ({}) => {
  const EmployeeSettingsStack = createStackNavigator();
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.secondaryColor}
        translucent={true}
      />
      <EmployeeSettingsStack.Navigator
        initialRouteName={String.EMPLOYEE_SETTINGS}
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
        <EmployeeSettingsStack.Screen
          name={String.EMPLOYEE_SETTINGS}
          component={EmployeeSettings}
          options={navigatorOptions}
        />
        <EmployeeSettingsStack.Screen
          name={String.EMPLOYEE_EDIT_PROFILE}
          component={EmployeeEditProfile}
          options={navigatorOptions}
        />
        <EmployeeSettingsStack.Screen
          name={String.EMPLOYEE_AUTO_PAYMENT_SETUP}
          component={EmployeeAutoPaymentSetup}
          options={navigatorOptions}
        />
        <EmployeeSettingsStack.Screen
          name={String.EMPLOYEE_PROOF_VERIFICATION}
          component={EmployeeProofVerification}
          options={navigatorOptions}
        />
        <EmployeeSettingsStack.Screen
          name={String.EMPLOYEE_NOTIFICATION}
          component={EmployeeNotification}
          options={navigatorOptions}
        />
        <EmployeeSettingsStack.Screen
          name={String.EMPLOYEE_TERMS_AND_CONDITION}
          component={Terms}
          options={navigatorOptions}
        />
        <EmployeeSettingsStack.Screen
          name={String.EMPLOYEE_VERIFICATION}
          component={EmployeeVerification}
          options={navigatorOptions}
        />
        <EmployeeSettingsStack.Screen
          name={String.EMPLOYEE_DELETE_ACCOUNT}
          component={EmployeeDeleteAccount}
          options={navigatorOptions}
        />
        <EmployeeSettingsStack.Screen
          name={String.EMPLOYEE_VERIFICATION_OTP}
          component={EmployeeVerificationOTP}
          options={navigatorOptions}
        />
        <EmployeeSettingsStack.Screen
          name={String.EMPLOYEE_CHANGE_PASSWORD}
          component={EmployeeChangePassword}
          options={navigatorOptions}
        />
      </EmployeeSettingsStack.Navigator>
    </>
  );
};

export {EmployeeSettingsStack};
