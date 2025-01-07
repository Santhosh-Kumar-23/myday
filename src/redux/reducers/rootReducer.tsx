import {combineReducers} from 'redux';
import * as Interfaces from '../../constants/interfaces';
import * as ReduxTypes from '../types/reduxtypes';
import AppReducer from './appReducer';

const rootReducers: any = combineReducers({
  appReducer: AppReducer,
});
function rootReducer(
  state: object | Interfaces.RootReducersStateInterface,
  action: Interfaces.ActionsInterface,
): any {
  ReduxTypes.Signout == action.type && [(state = {})];

  return rootReducers(state, action);
}

export default rootReducer;
