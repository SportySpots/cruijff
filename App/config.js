import { Text } from 'react-native';
import './I18n/I18n';
import Config from 'react-native-config';

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
};

if (__DEV__) {
  // If ReactNative's yellow box warnings are too much, it is possible to turn
  // it off, but the healthier approach is to fix the warnings.  =)
  console.disableYellowBox = false;
  settings.seedorfRestUrl = 'http://localhost:8000/api';
  settings.seedorfGraphQLUrl = 'http://localhost:8000/graphql';
}

console.log(settings);

export default settings;
