import { storiesOf } from '@storybook/react-native';
import React from 'react';
import navigation from './mocks';
import SpotsListScreen from '.';

storiesOf('Screens.Spots', module)
  .add('SpotsListScreen', () => (
    <SpotsListScreen navigation={navigation} />
  ));
