import { AppRegistry } from 'react-native';
import App from './App/App';
import userStore from 'App/Stores/User';
import locationStore from 'App/Stores/Location';
import spotFilterStore from 'App/Stores/SpotFilters';
import codePushStore from 'App/Stores/CodePush';
import logStore from 'App/Stores/Log';

if (__DEV__) {
  window.stores = {
    user: userStore,
    location: locationStore,
    spotFilters: spotFilterStore,
    codePush: codePushStore,
    log: logStore,
  }
}
// https://github.com/apollographql/apollo-client/issues/3236
Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
// eslint-disable-next-line no-proto
  obj.__proto__ = proto;
  return obj;
};

AppRegistry.registerComponent('SportySpots', () => App);

