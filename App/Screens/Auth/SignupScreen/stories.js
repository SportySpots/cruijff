import { storiesOf } from '@storybook/react-native';
import React from 'react';
import navigation from './mocks';
import SignupScreen from '.';

storiesOf('Screen.Auth', module)
  .add('SignupScreen', () => <SignupScreen navigation={navigation} />);
