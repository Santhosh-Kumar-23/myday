import {Store, StoreEnhancer, applyMiddleware, createStore} from 'redux';
import thunk, {withExtraArgument} from 'redux-thunk';
import rootReducer from './rootReducer';
import * as Constants from '../types/reduxtypes';
const middleware: StoreEnhancer<
  {
    dispatch: {};
  },
  {}
> = applyMiddleware(withExtraArgument(thunk));

const store: Store = createStore(rootReducer, middleware);

export default store;
