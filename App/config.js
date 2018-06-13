import { Text } from 'react-native';
import Config from 'react-native-config';
import './I18n/I18n';


if (typeof global.self === 'undefined') {
  // needed for apollo client
  global.self = global;
}

// Allow/disallow font-scaling in app
Text.defaultProps.allowFontScaling = true;

const settings = {
  seedorfRestUrl: Config.SEEDORF_REST_URL,
  seedorfGraphQLUrl: Config.SEEDORF_GRAPHQL_URL,
  useFixtures: Config.USE_FIXTURES === 'YES',
  deeplinkHost: Config.DEEPLINK_HOST,
};

export const log = [];

if (__DEV__) {
  // If ReactNative's yellow box warnings are too much, it is possible to turn
  // it off, but the healthier approach is to fix the warnings.  =)
  console.disableYellowBox = false;
  settings.seedorfRestUrl = 'https://api.sportyspots.com/api';
  settings.seedorfGraphQLUrl = 'https://api.sportyspots.com/graphql';
  // settings.seedorfRestUrl = 'http://localhost:8000/api';
  // settings.seedorfGraphQLUrl = 'http://localhost:8000/graphql';
} else {
  const bootTime = new Date();
  const oldConsoleLog = console.log;
  console.log = (...args) => {
    oldConsoleLog(...args);
    log.push({ logTime: (new Date() - bootTime) / 1000, ...args });
  };
}

console.log('settings', settings);

export default settings;
