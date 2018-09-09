/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';

<<<<<<< HEAD
import CancelGameScreen from '../../Screens/Games/CancelGameScreen';
import GameDetailsScreen from '../../Screens/Games/GameDetailsScreen';
=======
>>>>>>> 0230af992bb7045dc1b674780f6f5b3b39438b35
import GamesListScreen from '../../Screens/Games/GamesListScreen';
import PlayerListScreen from '../../Screens/Games/PlayerListScreen';
import { WithApolloMockProvider } from '../../GraphQL';

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { uuid: 1 },
  },
};

storiesOf('Screens.Games', module)
<<<<<<< HEAD
  .add('CancelGameScreen', () => (
    <Provider store={store}>
      <WithApolloMockProvider>
        <CancelGameScreen navigation={{
            state: { params: { uuid: 'cdfa268a-e809-43be-a659-bd2310737baa' } },
          }} 
          />
      </WithApolloMockProvider>
    </Provider>
  ));

storiesOf('Screens.Games', module)
  .add('GameDetailsScreen', () => (
    <Provider store={store}>
      <WithApolloMockProvider>
        <GameDetailsScreen navigation={dummyNavigator} />
      </WithApolloMockProvider>
    </Provider>
  ))
=======
>>>>>>> 0230af992bb7045dc1b674780f6f5b3b39438b35
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
