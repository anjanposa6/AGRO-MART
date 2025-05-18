/**
 * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);


import { AppRegistry } from 'react-native';
import App from './App'; // Ensure the correct path to App component
import { name as appName } from './app.json'; // Typically comes from the auto-generated app.json

AppRegistry.registerComponent(appName, () => App);
