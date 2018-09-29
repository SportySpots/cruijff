import React from 'react';
import { storiesOf } from '@storybook/react-native';
import GamesListScreen from '.';

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { uuid: 1 },
  },
};

storiesOf('Screens.Games', module)
  .add('GamesListScreen', () => (
    <GamesListScreen navigation={dummyNavigator} />
  ));
