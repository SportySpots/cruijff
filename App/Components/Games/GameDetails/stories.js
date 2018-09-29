import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ScrollView } from 'react-native';
import { Query } from 'react-apollo';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import GameDetails from '.';

const user = {
  uuid: '123456',
};

storiesOf('Games.GameDetails', module)
  .add('GameDetails PLANNED', () => (
    <ScrollView style={{ flex: 1 }}>
      <Query
        query={GET_GAME_DETAILS}
        variables={{ uuid: 455 }}
      >
        {({ loading, error, data }) =>
          (loading || error ? null : (
            <GameDetails
              user={user}
              game={Object.assign({}, data.game, { status: 'PLANNED' })}
            />
          ))
        }
      </Query>
    </ScrollView>
  ))
  .add('GameDetails CANCELED', () => (
    <ScrollView style={{ flex: 1 }}>
      <Query
        query={GET_GAME_DETAILS}
        variables={{ uuid: 455 }}
      >
        {({ loading, error, data }) =>
          (loading || error ? null : (
            <GameDetails
              user={user}
              game={Object.assign({}, data.game, { status: 'CANCELED' })}
            />
          ))
        }
      </Query>
    </ScrollView>
  ));
