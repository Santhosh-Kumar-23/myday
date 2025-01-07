import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Image, StatusBar, StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import HeaderTitle from '../../components/headerTitle';
import {backArrow} from '../../constants/icons';
import * as String from '../../constants/string';
import {COLORS} from '../../constants/theme';
import {
  ForgotPassword,
  Login,
  Notification,
  Otp,
  PasswordSuccess,
  ResetPassword,
  SignUp,
} from '../../screens/authScreens';
import {Terms} from '../../screens/employeeScreens';
import {navigatorOptions} from './navigationUtils';

const AuthStack: React.FC<{}> = (props: any) => {
  const AuthStack = createStackNavigator();
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.whiteColor}
        translucent={true}
      />
      <AuthStack.Navigator
        initialRouteName={String.lOG_IN}
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <HeaderTitle
              color1={COLORS.primaryColor}
              color2={COLORS.secondaryColor}
            />
          ),
          headerStyle: {
            // height: verticalScale(isIos ? 70 : 60),
            borderBottomWidth: 0,
            // backgroundColor: 'yellow',
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerBackImage: () => (
            <Image source={backArrow} style={Styles.iconStyle} />
          ),
        }}>
        <AuthStack.Group>
          <AuthStack.Screen
            name={String.lOG_IN}
            component={Login}
            options={navigatorOptions}
          />
          <AuthStack.Screen name={String.SIGN_UP} component={SignUp} />
          <AuthStack.Screen
            name={String.FORGOT_PASSWORD}
            component={ForgotPassword}
            options={navigatorOptions}
          />
          <AuthStack.Screen
            name={String.OTP}
            component={Otp}
            options={navigatorOptions}
          />
          <AuthStack.Screen
            name={String.NOTIFICATION}
            component={Notification}
            options={[
              {
                headerTitleAlign: 'center',
                headerTitle: () => (
                  <HeaderTitle
                    color1={COLORS.primaryColor}
                    color2={COLORS.secondaryColor}
                  />
                ),
                headerStyle: {
                  // height: verticalScale(60),
                  borderBottomWidth: 0,
                  elevation: 0,
                  backgroundColor: COLORS.secondaryBackgroundColor,
                },
                headerBackImage: () => (
                  <Image source={backArrow} style={Styles.iconStyle} />
                ),
              },
              navigatorOptions,
            ]}
          />
          <AuthStack.Screen
            name={String.TERMS_AND_CONDITION}
            component={Terms}
            options={[
              {
                headerTitleAlign: 'center',
                headerTitle: () => (
                  <HeaderTitle
                    color1={COLORS.primaryColor}
                    color2={COLORS.secondaryColor}
                  />
                ),
                headerStyle: {
                  // height: verticalScale(isIos ? 70 : 60),
                  borderBottomWidth: 0,
                  elevation: 0,
                  backgroundColor: COLORS.secondaryBackgroundColor,
                },
                headerBackImage: () => (
                  <Image source={backArrow} style={Styles.iconStyle} />
                ),
              },
              navigatorOptions,
            ]}
          />
          <AuthStack.Screen
            options={({navigation}) => ({
              ...navigatorOptions,
              ...{headerLeft: () => null},
              // headerLeft: () => (
              //   <Pressable
              //     onPress={() => {
              //       navigation.pop(2);
              //     }}>
              //     <Image
              //       source={backArrow}
              //       style={[Styles.iconStyle, {marginLeft: 20}]}
              //     />
              //   </Pressable>
              // ),
            })}
            name={String.RESET_PASSWORD}
            component={ResetPassword}
          />
          <AuthStack.Screen
            name={String.PASSWORD_SUCCESS_PAGE}
            component={PasswordSuccess}
            options={props => ({
              ...navigatorOptions,
              ...{headerLeft: () => null},
            })}
          />
        </AuthStack.Group>
      </AuthStack.Navigator>
    </>
  );
};

const Styles = StyleSheet.create({
  iconStyle: {
    height: verticalScale(9),
    width: scale(14),
    marginLeft: moderateScale(10),
  },
});

export {AuthStack};
