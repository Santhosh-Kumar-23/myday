import React from 'react';
import {StatusBar, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../../screens/authScreens';
import {GetStarted, Intro} from '../../screens/authScreens';
import {COLORS} from '../../constants/theme';

const GetStartStack: React.FC<{}> = ({}) => {
  const GetStartStack = createStackNavigator();
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.whiteColor}
        translucent={true}
      />
      <GetStartStack.Navigator
        initialRouteName="Intro"
        screenOptions={{headerShown: false}}>
        <GetStartStack.Group>
          <GetStartStack.Screen name="GetStarted" component={GetStarted} />
          <GetStartStack.Screen name="Intro" component={Intro} />
        </GetStartStack.Group>
      </GetStartStack.Navigator>
    </>
  );
};

export {GetStartStack};
