/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/ListItems';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

console.disableYellowBox = true;
