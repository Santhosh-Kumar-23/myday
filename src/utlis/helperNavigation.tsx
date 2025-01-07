import {
  NavigationAction,
  NavigationContainerRef,
} from '@react-navigation/native';
import {RefObject, createRef} from 'react';

export const navigationRef: RefObject<NavigationContainerRef<any>> =
  createRef();

export const navigate = (name: string, params?: object) => {
  navigationRef.current?.navigate(name, params);
};

export const navigateDispatch = (action: NavigationAction) => {
  navigationRef.current?.dispatch(action);
};
