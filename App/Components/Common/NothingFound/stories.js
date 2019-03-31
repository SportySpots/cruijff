import React from 'react';
import { storiesOf } from '@storybook/react-native';
import NothingFound from '.';

storiesOf('Common.NothingFound', module)
  .add('NothingFound', () => (
    <NothingFound
      iconSet="MaterialCommunityIcons"
      iconName="map-marker"
      text="Oops, nothing found"
    />
  ));
