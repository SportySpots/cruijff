import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import { View } from 'react-native';
import { WithApolloMockProvider } from '../../GraphQL';

import GameListCard from './GameListCard';
import GameProperties from './GameProperties';
import GET_GAMES_LIST from '../../GraphQL/Games/Queries/GET_GAMES_LIST';
import ActivityCard from './ActivityCard';

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { uuid: 1 },
  },
};

const game = {
  uuid: '6b7588e0-0c95-4797-94ea-51b03e1eedbf',
  name: "Sez's dgsldkgj lksdjgklsdjg sdg game",
  start_time: '2018-05-24T16:00:00+00:00',
  end_time: '2018-05-24T04:00:00+00:00',
  is_featured: false,
  show_remaining: true,
  capacity: 8,
  description: 'The description',
  sport: {
    category: 'BEACH_VOLLEYBALL',
  },
  spot: {
    name: 'Oosterpark',
    images: [
      {
        image: 'https://s3.amazonaws.com/sportyspots-prd/spots/dea377b2-cff8-49ae-97ea-475d22a3a477/images/Paramariboplein.jpg',
      },
    ],
  },
  organizer: {
    first_name: 'Tom',
    last_name: 'Klaver',
  },
  attendees: [
    {
      status: 'ATTENDING',
      user: {
        first_name: 'Rolf',
        last_name: 'Thijsen',
      },
    },
    {
      status: 'ATTENDING',
      user: {
        first_name: 'Rolf',
        last_name: 'Thijsen',
      },
    },
    {
      status: 'ATTENDING',
      user: {
        first_name: 'Rolf',
        last_name: 'Thijsen',
      },
    },
    {
      status: 'OTHER_STATUS',
      user: {
        first_name: 'Tom',
        last_name: 'Klaver',
      },
    },
  ],
};

storiesOf('Games', module)
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

  .add('GameProperties', () => <GameProperties game={game} />)
  .add('ActivityCard', () => (
    <View>
      <ActivityCard game={game} />
    </View>
  ));
