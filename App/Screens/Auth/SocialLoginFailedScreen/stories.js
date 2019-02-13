import { storiesOf } from '@storybook/react-native';
import React from 'react';
import navigation from './mocks';
import LoginScreen from '.';

storiesOf('Screen.Auth', module)
  .add('LoginScreen', () => <LoginScreen navigation={navigation} />);
