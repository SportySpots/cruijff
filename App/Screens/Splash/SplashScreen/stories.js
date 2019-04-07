import React from 'react';
import { storiesOf } from '@storybook/react-native';
import navigation from './mocks';
import SplashScreen from '.';

// TODO: load/pass user context
storiesOf('Screens.Splash', module)
  .add('SplashScreen', () => (
    <SplashScreen
      navigation={navigation}
    />
  ));
