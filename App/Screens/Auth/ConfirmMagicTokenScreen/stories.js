import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CheckEmailScreen from '.';

storiesOf('Screen.Auth', module)
  .add('CheckEmailScreen LOGIN', () => (
    <CheckEmailScreen action="login" />
  ))
  .add('CheckEmailScreen SIGNUP', () => (
    <CheckEmailScreen action="signup" />
  ));
