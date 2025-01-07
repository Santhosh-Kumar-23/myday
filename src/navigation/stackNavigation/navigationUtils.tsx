
import { useContext } from 'react';
import {COLORS} from '../../constants/theme';
import { AppContextType } from '../../constants/types';
import { isIos } from '../../utlis/functions';
import { AppContext } from '../appContext/appContext';
import store from '../../redux/reducers/store';
import * as Actions from '../../redux/actions/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

const {clearUserInfo} =
useContext<AppContextType>(AppContext);

export const navigatorOptions = {
  headerShown: true,
  cardStyle: {backgroundColor: COLORS.DashboardBackgroundColor},
  cardStyleInterpolator: ({current: {progress}}) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    },
    // Remove the shadow effect by setting overlay opacity to 0
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0], // Set the outputRange to [0, 0] to remove the shadow
        extrapolate: 'clamp',
      }),
    },
  }),
};


export const OrganizationnavigationHeader = {
  headerTitleAlign: 'center',
  headerTitleStyle:{color:COLORS.secondaryColor},
  headerStyle: {
    backgroundColor: COLORS.secondaryColor,
    elevation: 0,
    shadowColor: 'transparent',
    borderBottomWidth: 0,
  },
  headerLeft: () => null,
}

export const onlogout = async () => {
  clearUserInfo();
  store.dispatch(Actions.clearReduxStates());
  AsyncStorage.removeItem('biometricsEnabled');
  PushNotification.cancelAllLocalNotifications();
  PushNotification.removeAllDeliveredNotifications();
};