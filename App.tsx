import {ApolloProvider} from '@apollo/client';
import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from '@react-native-community/netinfo';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {LogBox} from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import client from './src/api/client';
import Network from './src/components/network';
import * as Interfaces from './src/constants/interfaces';
import {Router} from './src/navigation/router/router';
import * as Actions from './src/redux/actions/actions';
import {
  AuthenticationModal,
  checkBiometricIsAvailable,
  checkBiometricsOnAppOpen,
} from './src/utlis/bioMetrics';
import {CustomFallback} from './src/utlis/errorBoundary';
import {
  backgroundMessage,
  createNotificationChannel,
  foregroundMessage,
} from './src/utlis/pushNotification';

const App: React.FC<{}> = ({}) => {
  const [lockScreenEnable, setLockScreenEnable] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log('useFocusEffect');
  //     // Example: Refresh data when the screen is active
  //     // return () => console.log('Screen is no longer in focus!');
  //   }, []),
  // );
  useEffect(() => {
    console.log('useEffect');
    // Example: Fetch data from API
    // return () => console.log('Cleaning up on unmount!');
  }, []); // Runs once after the first render

  useLayoutEffect(() => {
    console.log('useLayoutEffect');
    // Example: Modify layout-related state before screen is shown
    // setText('Updated before painting');
  }, []); // Runs before the screen is displayed

  //other varibales
  const dispatch: any = useDispatch();
  const {networkStatus} = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.appReducer,
  );
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    if (process.env.NODE_ENV !== 'development') {
      console.log = () => {};
      console.debug = () => {};
      console.info = () => {};
      console.warn = () => {};
    }
  }, []);
  useEffect(() => {
    // checkBiometricEnabledOnAppOpen();
    // handleRetry();
    checkBiometricAvailablity();
    createNotificationChannel();
    // requestNotificationPermission();
    foregroundMessage();
    backgroundMessage();
  }, []);

  const checkBiometricAvailablity = async () => {
    try {
      const isAvailable = await checkBiometricIsAvailable();
      if (isAvailable) {
        handleRetry();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRetry = async () => {
    setModalVisible(false);
    const success = await checkBiometricsOnAppOpen(
      setModalVisible,
      setIsAuthenticated,
    );
    setIsAuthenticated(success);
  };
  //hook Functions
  useEffect(() => {
    const unsubscribe: NetInfoSubscription = handleNetworkStatus();

    return (): void => unsubscribe();
  }, [networkStatus]);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  const handleNetworkStatus = (): NetInfoSubscription => {
    return NetInfo.addEventListener((state: NetInfoState): void => {
      dispatch(Actions.storeNetworkStatus(state.isConnected || false));

      if (!networkStatus && state.isConnected) {
        dispatch(Actions.storeBackOnline(true));

        setTimeout((): void => {
          dispatch(Actions.storeBackOnline(false));
        }, 2500);
      }
    });
  };

  return (
    <ErrorBoundary FallbackComponent={CustomFallback}>
      <Network>
        <ApolloProvider client={client}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            {!isAuthenticated && (
              <AuthenticationModal
                visible={modalVisible}
                onRetry={handleRetry}
              />
            )}
            <Router />
          </SafeAreaProvider>
        </ApolloProvider>
      </Network>
    </ErrorBoundary>
  );
};

export {App};
