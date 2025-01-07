import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useMemo, useReducer, useState} from 'react';
import FlashMessage from 'react-native-flash-message';
import PushNotification from 'react-native-push-notification';
import {Loader} from '../../components/loader';
import BiometricsModal from '../../components/modal/biometricsModal';
import ErrorModal from '../../components/modal/errorModal';
import * as localStorage from '../../constants/localStorage';
import * as String from '../../constants/string';
import {AppContextType} from '../../constants/types';
import {
  InitialState,
  NavigationReducer,
} from '../../redux/reducers/navigationReducer';
import store from '../../redux/reducers/store';
import * as types from '../../redux/types/reduxtypes';
import {handleNotificationRedirection} from '../../utlis/functions';
import * as HelperNavigation from '../../utlis/helperNavigation';
import {AppContext} from '../appContext/appContext';
import {AuthStack} from '../stackNavigation/authStack';
import {GetStartStack} from '../stackNavigation/getStartedStack';
import {AdminTab} from '../tabNavigation/adminTab';
import {EmployeeTab} from '../tabNavigation/employeeTab';
import {OrganizationTab} from '../tabNavigation/organizationTab';

const Router: React.FC<{}> = (props: any) => {
  const [state, dispatch] = useReducer(NavigationReducer, InitialState); // AppContext Reducers
  const [sliderData, setSliderData] = useState<any>(null);
  const {navigation} = props;
  const [userInfo, setUserInfo] = useState<any>(null);

  const errorStatus: boolean =
    store.getState().appReducer?.errorMessage?.status ?? false;
  const errorMessage: string =
    store.getState().appReducer?.errorMessage?.errorMessage ?? '';
  const errorType: string =
    store.getState().appReducer?.errorMessage?.errorType ?? '';
  const enableBiometricsModal: boolean =
    store.getState().appReducer?.enableBiometrics ?? false;
  // console.log(enableBiometricsModal, 'enableBiometricsModal');

  const linking = {
    prefixes: ['mdpd://'],
    config: {
      screens: {
        Home: 'home',
        ResetPassword: 'ResetPassword',
        Details: 'details/:personId',
      },
    },
  };

  useEffect(() => {
    const handleInitialNotification = (notification: any) => {
      if (notification?.userInteraction) {
        console.log(
          'Notification kill state::::::::::::::::::::::::::',
          notification,
        );
        setTimeout(() => {
          handleNotificationRedirection(notification);
        }, 1000);
      }
    };

    PushNotification.popInitialNotification(handleInitialNotification);
  }, []);

  useEffect(() => {
    const fetchIntroSliderStatus = async () => {
      const sliderData = await localStorage.getIntroSlider();
      const userInfo = await localStorage.getUserInformation();
      if (sliderData !== null) {
        setSliderData(sliderData);
      }
      setUserInfo(userInfo);
      dispatch({type: types.Intro, payload: ''});
    };
    fetchIntroSliderStatus();
  }, []);

  const authContextValue = useMemo<AppContextType>(
    () => ({
      // useMemo Used For Users Tab Calling
      Employee: () => {
        dispatch({type: types.Employee, payload: '2'});
      },
      Organization: () => {
        dispatch({type: types.Organization, payload: '3'});
      },
      Admin: () => {
        dispatch({type: types.Admin, payload: '4'});
      },
      AuthStack: () => {
        dispatch({type: types.Auth, payload: '1'});
      },
      clearUserInfo: () => {
        localStorage.clearUserInfo();
        setUserInfo(null);
        dispatch({type: types.Signout, payload: '5'});
      },
    }),
    [dispatch],
  );

  const chooseStack = (userToken: string) => {
    // If userInfo is present, prioritize userInfo to choose the stack
    if (userInfo !== null && userInfo.role) {
      switch (userInfo.role) {
        case types.Admin:
          return <AdminTab />; // Admin Tab
        case types.Organization:
          return <OrganizationTab />; // Organization Tab
        case types.Employee:
          return <EmployeeTab />; // Employee Tab
        default:
          return <AuthStack />; // Default to EmployeeTab if userRole is unrecognized
      }
    } else if (sliderData !== null || (global as any).myGlobalVariable) {
      // If sliderData is present but no userInfo, show AuthStack
      switch (userToken) {
        case null:
        case '':
          return <AuthStack />; // Login Stack
        case '1':
          return <AuthStack />; // Get Start
        case '2':
          return <EmployeeTab />; // Employee Tab
        case '3':
          return <OrganizationTab />; // Organization Tab
        case '4':
          return <AdminTab />; // Admin Tab
        default:
          return <AuthStack />; // Return Auth Stack
      }
    } else {
      // If neither userInfo nor sliderData is present, show GetStartStack
      switch (userToken) {
        case null:
        case '':
          return <GetStartStack />; // Login Stack
        case '1':
          return <AuthStack />; // Get Start
        case '2':
          return <EmployeeTab />; // Employee Tab
        case '3':
          return <OrganizationTab />; // Organization Tab
        case '4':
          return <AdminTab />; // Admin Tab
        default:
          return <GetStartStack />; // Return GetStartStack
      }
    }
  };

  if (state.isLoading) {
    return <Loader />;
  } else {
    return (
      <>
        <NavigationContainer
          linking={linking}
          ref={HelperNavigation.navigationRef}>
          <AppContext.Provider value={authContextValue}>
            {chooseStack(state.userToken)}
          </AppContext.Provider>
        </NavigationContainer>
        <FlashMessage
          animated={true}
          autoHide={true}
          duration={String.FLASH_MESSAGE_DURATION}
          position={String.TOP}
        />
        <ErrorModal
          modalVisible={errorStatus}
          title={errorMessage}
          errorType={errorType}
        />
        <BiometricsModal modalVisible={enableBiometricsModal} />
      </>
    );
  }
};

export {Router};
