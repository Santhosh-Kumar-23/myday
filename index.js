/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {App} from './App';
import {name as appName} from './app.json';
import Store from './src/redux/reducers/store';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
const Root = () => {
 
  
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
};
function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <Root />;
}
AppRegistry.registerComponent(appName, () => HeadlessCheck);
