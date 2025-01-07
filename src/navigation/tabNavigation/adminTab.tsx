import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Image, StatusBar} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  adminTabActive,
  adminTabInActive,
  groups,
  homeIcon,
  homeIconInActive,
  organizationProfileActive,
  organizationProfileInActive,
} from '../../constants/icons';
import {COLORS} from '../../constants/theme';
import {isIos} from '../../utlis/functions';
import {AdminConnectedOrganizationStack} from '../stackNavigation/adminConnectedOrganizationStack';
import {AdminLoanRecoveredStack} from '../stackNavigation/adminLoanRecoveredStack';
import {AdminProfileStack} from '../stackNavigation/adminProfileStack';
import {AdminStack} from '../stackNavigation/adminStack';

const AdminTab: React.FC<{}> = ({}) => {
  const AdminTab = createBottomTabNavigator();
  const {width, height} = Dimensions.get('window');
  const isSmallDevice = width < 375;
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.secondaryColor}
      />
      <AdminTab.Navigator
        safeAreaInsets={{bottom: 0}}
        initialRouteName="Feed"
        screenOptions={({route}) => ({
          headerStyle: {backgroundColor: '#42f44b'},
          headerTintColor: '#fff',
          headerShown: false,
          tabBarShowLabel: false,
          headerTitleStyle: {fontWeight: 'bold'},
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarIconStyle: {},
          tabBarStyle: {
            borderRadius: isIos ? 100 : 40,
            width: '80%',
            marginHorizontal: 40,
            position: 'absolute',
            bottom: isIos ? 30 : 25,
            //paddingVertical: isIos && moderateScale(20),
            height: isIos ? verticalScale(56) : verticalScale(60),
          },
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'AdminHomeStack') {
              iconName = focused ? homeIcon : homeIconInActive;
            } else if (route.name === 'AdminConnectedOrganization') {
              iconName = focused ? groups : groups;
            } else if (route.name === 'AdminProfileStack') {
              iconName = focused
                ? organizationProfileActive
                : organizationProfileInActive;
            } else if (route.name === 'AdminLoanRecoveredStack') {
              iconName = focused ? adminTabActive : adminTabInActive;
            }
            return (
              <Image
                source={iconName}
                resizeMode="cover"
                style={{
                  width: isIos
                    ? scale(25)
                    : route.name === 'AdminTab'
                    ? 27
                    : 30,
                  height: isIos
                    ? scale(25)
                    : route.name === 'AdminTab'
                    ? 27
                    : 30,
                  aspectRatio: 1,
                  tintColor: focused ? COLORS.secondaryColor : '#AFAFAF',
                }}
              />
            );
          },
        })}>
        <AdminTab.Screen
          name="AdminHomeStack"
          component={AdminStack}
          options={{
            tabBarLabel: 'Home',
            title: 'Home',
          }}
          listeners={({navigation}) => ({
            tabPress: e => {
              e.preventDefault();
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'AdminHomeStack'}],
                }),
              );
            },
          })}
        />
        <AdminTab.Screen
          name="AdminConnectedOrganization"
          component={AdminConnectedOrganizationStack}
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
                  routes: [{name: 'AdminConnectedOrganization'}],
                }),
              );
            },
          })}
        />
        <AdminTab.Screen
          name="AdminLoanRecoveredStack"
          component={AdminLoanRecoveredStack}
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
                  routes: [{name: 'AdminLoanRecoveredStack'}],
                }),
              );
            },
          })}
        />
        <AdminTab.Screen
          name="AdminProfileStack"
          component={AdminProfileStack}
          options={{
            unmountOnBlur: true,
            tabBarLabel: 'Settings',
            title: 'Setting',
          }}
          listeners={({navigation}) => ({
            tabPress: e => {
              e.preventDefault();
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'AdminProfileStack'}],
                }),
              );
            },
          })}
        />
      </AdminTab.Navigator>
    </>
  );
};

export {AdminTab};
