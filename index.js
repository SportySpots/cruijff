import { AppRegistry } from 'react-native';
import App from './App/App';

// https://github.com/apollographql/apollo-client/issues/3236
Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
};

AppRegistry.registerComponent('SportySpots', () => App);
