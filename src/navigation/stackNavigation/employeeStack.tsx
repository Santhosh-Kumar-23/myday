// EmployeeStack.js
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import HeaderTitle from '../../components/headerTitle';
import * as NavigationName from '../../constants/string';
import {COLORS} from '../../constants/theme';
import {LockScreen} from '../../screens/authScreens';
import {EmployeeHome, EmployeeLoanHome} from '../../screens/employeeScreens';
import {navigatorOptions} from './navigationUtils';

const EmployeeStack: React.FC<{}> = ({}) => {
  const EmployeeStack = createStackNavigator();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.secondaryColor}
        translucent={true}
      />
      <EmployeeStack.Navigator
        initialRouteName={NavigationName.EMPLOYEE_LOAN_HOME}
        screenOptions={{
          headerTitleAlign: 'center',
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
            shadowColor: 'transparent',
            borderBottomWidth: 0,
          },
        }}>
        <EmployeeStack.Group>
          <EmployeeStack.Screen
            name={NavigationName.EMPLOYEE_HOME}
            component={EmployeeHome}
            options={navigatorOptions}
          />
          <EmployeeStack.Screen
            name={NavigationName.EMPLOYEE_LOAN_HOME}
            component={EmployeeLoanHome}
            // options={navigatorOptions}
          />
          <EmployeeStack.Screen
            name={NavigationName.EMPLOYEE_lOCK_SCREEN}
            options={{headerShown: false}}
            component={LockScreen}
          />
        </EmployeeStack.Group>
      </EmployeeStack.Navigator>
    </>
  );
};

export {EmployeeStack};
