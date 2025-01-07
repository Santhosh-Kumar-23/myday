import React, {createContext} from 'react';
import {AppContextType} from '../../constants/types';

// Define the type for the context

// Create the context with a default value
const AppContext = createContext<AppContextType>({
  Employee: () => {},
  Organization: () => {},
  Admin: () => {},
  AuthStack:() => {},
  clearUserInfo:() =>{}
});

export {AppContext};
