import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {Image, View} from 'react-native';
import {
  homeIcon,
  homeIconInActive,
  loanIcon,
  loanIconInActive,
  profileIcon,
  profileIconInActive,
  trackLoanIcon,
  trackLoanIconInActive,
} from '../../constants/icons';
import {COLORS} from '../../constants/theme';
import {EmployeeLoanRequestStack} from '../stackNavigation/employeeLoanRequestStack';
import {EmployeeSettingsStack} from '../stackNavigation/employeeSettingsStack';
import {EmployeeStack} from '../stackNavigation/employeeStack';
import {EmployeeTrackLoanStack} from '../stackNavigation/employeeTrackLoanStack';

const EmployeeTab: React.FC<{}> = (props: any) => {
  const EmployeeTab = createBottomTabNavigator();
  const {navigation} = props;

  const dotsCount = (global as any).notificationCount;

  // console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww', dotsCount);

  return (
    <EmployeeTab.Navigator
      initialRouteName="EmployeeHomeStack"
      safeAreaInsets={{bottom: 0}}
      screenOptions={({route}) => ({
        headerStyle: {backgroundColor: '#42f44b'},
        headerShown: false,
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingHorizontal: 30,
          height: 70,
          elevation: 0,
          borderTopWidth: 0,
          backgroundColor: COLORS.DashboardBackgroundColor,
        },
        unmountOnBlur: true,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'EmployeeHomeStack') {
            iconName = focused ? homeIcon : homeIconInActive;
          } else if (route.name === 'LoanRequestStack') {
            iconName = focused ? loanIcon : loanIconInActive;
          } else if (route.name === 'TrackLoanStack') {
            iconName = focused ? trackLoanIcon : trackLoanIconInActive;
          } else if (route.name === 'ProfileStack') {
            iconName = focused ? profileIcon : profileIconInActive;
          }
          return (
            <View>
              <Image
                source={iconName}
                resizeMode="cover"
                tintColor={focused ? COLORS.secondaryColor : COLORS.lightGrey}
                style={{width: 30, height: 30, aspectRatio: 1}}
              />
              {route.name === 'ProfileStack' && dotsCount > 0 && (
                <View
                  style={{
                    height: 10,
                    width: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                    backgroundColor: COLORS.errorRed,
                    position: 'absolute',
                    right: -10,
                    top: -5,
                  }}></View>
              )}
            </View>
          );
        },
      })}>
      <EmployeeTab.Screen
        name="EmployeeHomeStack"
        component={EmployeeStack}
        options={{
          tabBarLabel: 'Home',
          title: 'Home',
        }}
      />
      <EmployeeTab.Screen
        name="LoanRequestStack"
        component={EmployeeLoanRequestStack}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            navigation.dispatch(
              CommonActions.navigate({
                name: 'LoanRequestStack',
              }),
            );
          },
        })}
        options={{
          tabBarLabel: 'Settings',
          title: 'Setting',
          unmountOnBlur: true,
        }}
      />
      <EmployeeTab.Screen
        name="TrackLoanStack"
        component={EmployeeTrackLoanStack}
        options={{
          tabBarLabel: 'Settings',
          title: 'Setting',
        }}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            navigation.dispatch(
              CommonActions.navigate({
                name: 'TrackLoanStack',
              }),
            );
          },
        })}
      />
      <EmployeeTab.Screen
        name="ProfileStack"
        component={EmployeeSettingsStack}
        options={{
          tabBarLabel: 'Settings',
          title: 'Setting',
        }}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            navigation.dispatch(
              CommonActions.navigate({
                name: 'ProfileStack',
              }),
            );
          },
        })}
      />
    </EmployeeTab.Navigator>
  );
};

export {EmployeeTab};
