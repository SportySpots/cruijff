import React from 'react';
import { storiesOf } from '@storybook/react-native';
import navigation from './mocks';
import LoggedOutScreen from '.';

storiesOf('Screens.Auth', module)
  .add('LoggedOutScreen', () => (
    <LoggedOutScreen navigation={navigation} />
  ))
  .add('LoggedOutScreen closable', () => (
    <LoggedOutScreen navigation={navigation} closable />
  ));
