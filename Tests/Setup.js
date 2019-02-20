import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '../storybook/setup_faker';
import './Mocks/firebase';
import { curatedSpots } from '../App/Components/Spots/SpotsList/utils';

Enzyme.configure({ adapter: new Adapter() });

// Mock your external modules here if needed
jest
  .mock('i18n-js', () => {
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

jest.mock('react-native-firebase', () => ({
  links: () => ({
    onLink: jest.fn(),
  }),
}));

jest.mock('react-native-localize', () => jest.fn());

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

// jest.mock('react-native/Libraries/Storage/AsyncStorage', () => ({
//   AsyncStorage: {
//     setItem: jest.fn(() => Promise.resolve()),
//     getItem: jest.fn(() => Promise.resolve(JSON.stringify({
//       latitude: 52.379189,
//       longitude: 4.899431,
//     }))),
//   },
// }));

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
