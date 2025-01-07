import * as QueryInterface from '../../api/queryInterface';
import * as Interfaces from '../../constants/interfaces';
import * as ReduxTypes from '../types/reduxtypes';
export const actions = () => {
  return {
    type: '',
  };
};
export const gettingUserData = (
  userData: Interfaces.userData[],
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.UserData,
    payload: userData,
  };
};
export const gettingMobileUserData = (
  mobileUserData: QueryInterface.GetMobileUserData,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.GET_USER_MOBILE_DATA,
    payload: mobileUserData,
  };
};
export const gettingEmployeeDetails = (
  getEmployeeDetails: QueryInterface.EmployeeUserDetails,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.GET_EMPLOYEE_DETAILS,
    payload: getEmployeeDetails,
  };
};

export const errorMessage = (
  errorDetails: Interfaces.errorDetailsInterface,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.ERROR_DETAIS,
    payload: errorDetails,
  };
};
export const gettingOrganizationDetails = (
  organizationDetails: QueryInterface.OrganizationUserDetails,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.GET_ORGANIZATION_DETAILS,
    payload: organizationDetails,
  };
};

export const clearReduxStates = (): Pick<
  Interfaces.ActionsInterface,
  'type'
> => {
  return {
    type: ReduxTypes.Signout,
  };
};

export const storeBackOnline = (
  backOnline: boolean,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.BACK_ONLINE,
    payload: backOnline,
  };
};

export const storeNetworkStatus = (
  networkStatus: boolean,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.NETWORK_STATUS,
    payload: networkStatus,
  };
};

export const pushNotificationToggle = (
  pushNotificationToggleButton: Boolean,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.PUSH_NOTIFICATION_TOGGLE,
    payload: pushNotificationToggleButton,
  };
};

export const employeeLoanDetails = (
  employeeLoanDetails: Interfaces.EmployeeLoanDetails,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.EMPLOYEE_LOAN_DETAILS,
    payload: employeeLoanDetails,
  };
};

export const biometricsModal = (
  enableBiometrics: boolean,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.ENABLE_BIOMETRICS,
    payload: enableBiometrics,
  };
};

export const profileUrl = (
  profileUrl: boolean,
): Interfaces.ActionsInterface => {
  return {
    type: ReduxTypes.PROFILE_URL,
    payload: profileUrl,
  };
};
