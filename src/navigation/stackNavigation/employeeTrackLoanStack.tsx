import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import HeaderTitle from '../../components/headerTitle';
import * as String from '../../constants/string';
import {COLORS} from '../../constants/theme';
import {
  EmployeePaymentHistory,
  EmployeeTrackLoanProcessPipeLine,
  EmployeeTrackLoanRequest,
} from '../../screens/employeeScreens';
import {navigatorOptions} from './navigationUtils';

const EmployeeTrackLoanStack: React.FC<{}> = ({}) => {
  const EmployeeTrackLoanStack = createStackNavigator();
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.secondaryColor}
        translucent={true}
      />
      <EmployeeTrackLoanStack.Navigator
        initialRouteName={String.EMPLOYEE_TRACK_LOAN_REQUEST}
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
        <EmployeeTrackLoanStack.Group>
          <EmployeeTrackLoanStack.Screen
            name={String.EMPLOYEE_TRACK_LOAN_REQUEST}
            component={EmployeeTrackLoanRequest}
            options={navigatorOptions}
          />
          <EmployeeTrackLoanStack.Screen
            name={String.EMPLOYEE_TRACK_LOAN_PROCESS_PIPELINE}
            component={EmployeeTrackLoanProcessPipeLine}
            options={navigatorOptions}
          />
          <EmployeeTrackLoanStack.Screen
            name={String.EMPLOYEE_PAYMENT_HISTORY}
            component={EmployeePaymentHistory}
            options={navigatorOptions}
          />
        </EmployeeTrackLoanStack.Group>
      </EmployeeTrackLoanStack.Navigator>
    </>
  );
};

export {EmployeeTrackLoanStack};
