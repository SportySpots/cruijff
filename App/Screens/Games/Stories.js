/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';

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
