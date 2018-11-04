import '../storybook/setup_faker';

// Mock your external modules here if needed
jest
  .mock('react-native-i18n', () => {
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

jest.mock('../App/Themes/Images.js', () => jest.fn());
jest.mock('../node_modules/react-native-calendars/src/calendar/img/next.png', () => jest.fn());
jest.mock('../node_modules/react-native-calendars/src/calendar/img/previous.png', () => jest.fn());
