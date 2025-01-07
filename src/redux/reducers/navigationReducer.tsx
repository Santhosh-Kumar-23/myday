import * as interfaces from '../../constants/interfaces';
import * as types from '../types/reduxtypes';
export const InitialState = {
  isLoading: true,
  userToken: '',
};
export const NavigationReducer = (
  state = InitialState,
  action: interfaces.Action,
) => {
  switch (action.type) {
    case types.Intro:
      console.log(action);
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
      };

    case types.Auth:
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
      };

    case types.Employee:
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
      };

    case types.Organization:
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
      };

    case types.Admin:
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
      };

    case types.Signout:
      return {
        ...state,
        userToken: '',
        isLoading: false,
      };

    default:
      return state;
  }
};
