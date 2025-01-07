import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {Image} from 'react-native';
import {
  dashboardActive,
  dashboardInActive,
  homeIcon,
  homeIconInActive,
  organizationProfileActive,
  organizationProfileInActive,
} from '../../constants/icons';
import {COLORS} from '../../constants/theme';
import OrganizationLoanReviewStack from '../stackNavigation/organizationLoanReviewStack';
import {OrganizationSettingsStack} from '../stackNavigation/organizationSettingsStack';
import {OrganizationStack} from '../stackNavigation/organizationStack';

const OrganizationTab: React.FC<{}> = ({}) => {
  const OrganizationTab = createBottomTabNavigator();

  return (
    <OrganizationTab.Navigator
      initialRouteName="OrganizationHomeStack"
      safeAreaInsets={{bottom: 0}}
      screenOptions={({route}) => ({
        headerStyle: {backgroundColor: '#42f44b'},
        headerTintColor: '#fff',
        headerShown: false,
        tabBarShowLabel: false,
        headerTitleStyle: {fontWeight: 'bold'},
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          borderRadius: 40,
          width: '80%',
          elevation: 5,
          marginHorizontal: 40,
          position: 'absolute',
          bottom: 25,
          height: 70,
        },
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'OrganizationHomeStack') {
            iconName = focused ? homeIcon : homeIconInActive;
          } else if (route.name === 'OrganizationLoanRequestStack') {
            iconName = focused ? dashboardActive : dashboardInActive;
          } else if (route.name === 'OrganizationProfileStack') {
            iconName = focused
              ? organizationProfileActive
              : organizationProfileInActive;
          }
          return (
            <Image
              source={iconName}
              tintColor={focused ? COLORS.secondaryColor : COLORS.lightGrey}
              resizeMode="cover"
              style={{
                width: route.name === 'OrganizationLoanRequestStack' ? 33 : 30,
                height: route.name === 'OrganizationLoanRequestStack' ? 33 : 30,
                aspectRatio: 1,
              }}
            />
          );
        },
      })}>
      <OrganizationTab.Screen
        name="OrganizationHomeStack"
        component={OrganizationStack}
        options={{
          tabBarLabel: 'Home',
          title: 'Home',
        }}
      />
      <OrganizationTab.Screen
        name="OrganizationLoanRequestStack"
        component={OrganizationLoanReviewStack}
        options={{
          tabBarLabel: 'Settings',
          title: 'Setting',
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'OrganizationLoanRequestStack'}],
              }),
            );
          },
        })}
      />
      <OrganizationTab.Screen
        name="OrganizationProfileStack"
        component={OrganizationSettingsStack}
        options={{
          tabBarLabel: 'Settings',
          title: 'Setting',
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'OrganizationProfileStack'}],
              }),
            );
          },
        })}
      />
    </OrganizationTab.Navigator>
  );
};

export {OrganizationTab};
