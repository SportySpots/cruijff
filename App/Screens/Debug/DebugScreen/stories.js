import React from 'react';
import { storiesOf } from '@storybook/react-native';
import navigation from './mocks';
import DebugScreen from '.';

storiesOf('Screens.Debug', module)
  .add('DebugScreen', () => (
    <DebugScreen navigation={navigation} />
  ));
