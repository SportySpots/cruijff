import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import { View } from 'react-native';
import { WithApolloMockProvider } from '../../GraphQL';
import Game from '../../Screens/Games/GameDetailsScreen';
import GamesList, { GET_GAMES_LIST } from '../../Screens/Games/GameListScreen';
import PlayerList from '../../Screens/Games/PlayerListScreen';
import GameListCard from './GameListCard';
import GameProperties from './GameProperties'

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { uuid: 1 },
  },
};

storiesOf('Games')
  .add('Game details', () => (
    <WithApolloMockProvider>
      <Game navigation={dummyNavigator} />
    </WithApolloMockProvider>
  ))
  .add('Game list card', () => (
    <View style={{ marginHorizontal: 16 }}>
      <WithApolloMockProvider>
        <Query query={GET_GAMES_LIST}>
          {({ loading, error, data }) =>
            (loading || error ? null : (
              <GameListCard game={data.games[0]} navigation={dummyNavigator} />
            ))
          }
        </Query>
      </WithApolloMockProvider>
    </View>
  ))
  .add('Games list', () => (
    <WithApolloMockProvider>
      <GamesList navigation={dummyNavigator} />
    </WithApolloMockProvider>
  ))
  .add('Player list', () => (
    <View style={{ flex: 1 }}>
      <WithApolloMockProvider>
        <PlayerList
          navigation={{
            state: { params: { uuid: 'cdfa268a-e809-43be-a659-bd2310737baa' } },
          }}
        />
      </WithApolloMockProvider>
    </View>
  ))
  .add('GameProperties', () => <GameProperties properties={gameProperties} />)