/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { View } from 'react-native';

import GameDetailsScreen from '../../Screens/Games/GameDetailsScreen';
import GamesListScreen from '../../Screens/Games/GamesListScreen';
import PlayerListScreen from '../../Screens/Games/PlayerListScreen';
import { WithApolloMockProvider } from '../../GraphQL';

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { uuid: 1 },
  },
};

const store = createStore(state => state, {
  spotFilters: {
    maxDistance: 2.0,
    sports: {},
  },
});

storiesOf('Screens.Games', module)
  .add('GameDetailsScreen', () => (
    <Provider store={store}>
      <WithApolloMockProvider>
        <GameDetailsScreen navigation={dummyNavigator} />
      </WithApolloMockProvider>
    </Provider>
  ))
  .add('GamesListScreen', () => (
    <WithApolloMockProvider>
      <GamesListScreen navigation={dummyNavigator} />
    </WithApolloMockProvider>
  ))
  .add('PlayerListScreen', () => (
    <View style={{ flex: 1 }}>
      <WithApolloMockProvider>
        <PlayerListScreen
          navigation={{
            state: { params: { uuid: 'cdfa268a-e809-43be-a659-bd2310737baa' } },
          }}
        />
      </WithApolloMockProvider>
    </View>
  ));
