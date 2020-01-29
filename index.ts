import { AppRegistry } from 'react-native';
import App from './App/App';
import config from './App/config';
import userStore from 'App/Stores/User';
import locationStore from 'App/Stores/Location';
import spotFilterStore from 'App/Stores/SpotFilters';
import codePushStore from 'App/Stores/CodePush';
import logStore, { Level, LogEntry } from 'App/Stores/Log';

import * as Sentry from '@sentry/react-native';

if (config.sentryDSN) {
  Sentry.init({
    dsn: config.sentryDSN,
    enableNative: false,
    enableNativeCrashHandling: false,
    enableNativeNagger: false,
    attachStacktrace: true
  });

  if (!__DEV__) {
    const mapper = {
      [Level.DEBUG]: Sentry.Severity.Debug,
      [Level.INFO]: Sentry.Severity.Info,
      [Level.WARN]: Sentry.Severity.Warning,
      [Level.ERROR]: Sentry.Severity.Error,
    }
    const sentryHandler = (entry: LogEntry) => {
      Sentry.captureMessage(entry.message, mapper[entry.level])
    }
    logStore.handlers.push(sentryHandler)
  }
}

if (__DEV__) {
  // @ts-ignore
  global.stores = window.stores = {
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

