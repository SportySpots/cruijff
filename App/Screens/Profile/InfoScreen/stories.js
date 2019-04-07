import React from 'react';
import { storiesOf } from '@storybook/react-native';
import navigation from './mocks';
import InfoScreen from '.';

storiesOf('Screens.Info', module)
  .add('InfoScreen', () => (
    <InfoScreen
      navigation={navigation}
    />
  ));
