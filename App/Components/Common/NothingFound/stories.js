import React from 'react';
import { storiesOf } from '@storybook/react-native';
import NothingFound from '.';

storiesOf('Common.NothingFound', module)
  .add('NothingFound', () => (
    <NothingFound
      icon="map-marker"
      text="Oops, nothing found"
    />
  ));
