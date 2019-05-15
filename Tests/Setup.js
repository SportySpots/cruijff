import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetch from 'node-fetch';
import { NativeModules as RNNativeModules } from 'react-native';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import '../storybook/setup_faker';

global.fetch = fetch;

Enzyme.configure({ adapter: new Adapter() });

RNNativeModules.UIManager = RNNativeModules.UIManager || {};
RNNativeModules.UIManager.RCTView = RNNativeModules.UIManager.RCTView || {};
RNNativeModules.RNGestureHandlerModule = RNNativeModules.RNGestureHandlerModule || {
  State: {
    BEGAN: 'BEGAN',
    FAILED: 'FAILED',
    ACTIVE: 'ACTIVE',
    END: 'END',
  },
  attachGestureHandler: jest.fn(),
  createGestureHandler: jest.fn(),
  dropGestureHandler: jest.fn(),
  updateGestureHandler: jest.fn(),

};
RNNativeModules.PlatformConstants = RNNativeModules.PlatformConstants || {
  forceTouchAvailable: false,
};

// Mock your external modules here if needed
jest.mock('i18n-js', () => {
  const english = require('../App/I18n/languages/english.json');
  const keys = require('ramda');
  const replace = require('ramda');
  const forEach = require('ramda');

  return {
    t: (key, replacements) => {
      let value = english[key];
      if (!value) return key;
      if (!replacements) return value;

      forEach((r) => {
        value = replace(`{{${r}}}`, replacements[r], value);
      }, keys(replacements));
      return value;
    },
  };
});

jest.mock('react-native-tab-view', () => ({
  out: jest.fn(),
}));

jest.mock('react-native-reanimated', () => ({
  Value: jest.fn(),
  event: jest.fn(),
  add: jest.fn(),
  eq: jest.fn(),
  set: jest.fn(),
  cond: jest.fn(),
  interpolate: jest.fn(),
  // View,
  Extrapolate: { CLAMP: jest.fn() },
}));

// Mock react-native-cookies
// REF: https://github.com/joeferraro/react-native-cookies/issues/16
// REF: https://github.com/joeferraro/react-native-cookies/issues/34
jest.mock('react-native-cookies', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn(),
}));

jest.mock('react-native-firebase', () => ({
  links: () => ({
    onLink: jest.fn(),
  }),
  analytics: () => ({
    logEvent: jest.fn(),
  }),
}));

jest.mock('react-native-localize', () => jest.fn());

jest.mock('../App/config.js', () => ({
  log: [],
}));
jest.mock('../package.json', () => ({
  version: '1.3.3',
}));
jest.mock('../App/Themes/Images.js', () => jest.fn());
jest.mock('../node_modules/react-native-calendars/src/calendar/img/next.png', () => jest.fn());
jest.mock('../node_modules/react-native-calendars/src/calendar/img/previous.png', () => jest.fn());

String.prototype.toTitleCase = jest.fn(); // eslint-disable-line no-extend-native

jest.useFakeTimers();
Date.now = jest.fn(() => new Date(Date.UTC(2017, 0, 1)).valueOf());

// Autofocus/blur prop was causing issues in some of the tests involving TextInput.
// So we mock the TextInput component and remove the autofocus prop to avoid the issue.
jest.mock('TextInput', () => {
  const RealComponent = require.requireActual('TextInput');
  const React = require('react');

  class TextInput extends React.PureComponent {
    render() {
      const { children, ...rest } = this.props;
      return React.createElement('TextInput', { ...rest, autoFocus: false }, children);
    }
  }
  TextInput.propTypes = RealComponent.propTypes;
  return TextInput;
});

jest.mock('../App/Components/Spots/SpotsList/utils.js', () => ({
  curatedSpots: jest.fn(),
}));

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
