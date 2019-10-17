/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App/Containers/App';
import {name as appName} from './app.json';
import bgMessaging from './App/Services/bgMessaging';
AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => bgMessaging,
);
