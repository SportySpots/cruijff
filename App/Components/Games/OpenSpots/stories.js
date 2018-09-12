import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import { WithApolloMockProvider } from '../../../GraphQL';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import OpenSpots from './index';

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { uuid: 455 },
  },
};

storiesOf('Games.OpenSpots', module)
  .add('OpenSpots', () => (
    <WithApolloMockProvider>
      <Query
        query={GET_GAME_DETAILS}
        variables={{ uuid: dummyNavigator.state.params.uuid }}
      >
        {({ loading, error, data }) =>
          (loading || error ? null : (
            <OpenSpots game={data.game} />
          ))
        }
      </Query>
    </WithApolloMockProvider>
  ));
