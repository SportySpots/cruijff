import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import { View } from 'react-native';
import { WithApolloMockProvider } from '../../GraphQL';
import Game from '../../Screens/Games/GameDetailsScreen';
import GamesList from '../../Screens/Games/GamesListScreen';
import PlayerList from '../../Screens/Games/PlayerListScreen';
import GameListCard from './GameListCard';
import GameProperties from './GameProperties';
import GET_GAMES_LIST from '../../GraphQL/Games/Queries/GET_GAMES_LIST';

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { uuid: 1 },
  },
};

const game = {
  uuid: '6b7588e0-0c95-4797-94ea-51b03e1eedbf',
  name: "Sez's game",
  start_time: '2018-05-24T16:00:00+00:00',
  end_time: '2018-05-24T04:00:00+00:00',
  is_featured: false,
  show_remaining: true,
  capacity: 8,
  description: 'The description',
  sport: {
    category: 'BEACH_VOLLEYBALL',
  },
  spot: null,
  organizer: {
    first_name: 'Tom',
    last_name: 'Klaver',
  },
  attendees: [],
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
  .add('GameProperties', () => <GameProperties game={game} />);
