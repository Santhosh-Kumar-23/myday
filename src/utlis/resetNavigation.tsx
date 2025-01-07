import {CommonActions} from '@react-navigation/native';

export const resetNavigationStack = (navigation: any) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: 'EmployeeHomeStack'}],
    }),
  );
};

export const organizationResetNavigationStack = (navigation: any) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: 'OrganizationHomeStack'}],
    }),
  );
};

export const adminResetNavigationStack = (navigation: any) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: 'AdminHomeStack'}],
    }),
  );
};
