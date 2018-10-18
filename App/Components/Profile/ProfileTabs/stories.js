import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import { Query } from 'react-apollo';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import GameListCard from '.';

storiesOf('Games.GameListCard', module)
  .add('GameListCard PLANNED', () => (
    <View>
      <Query
        query={GET_GAME_DETAILS}
        variables={{ uuid: 455 }}
      >
        {({ loading, error, data }) =>
          (loading || error ? null : (
            <GameListCard
              game={Object.assign({}, data.game, { status: 'PLANNED' })}
            />
          ))
        }
      </Query>
    </View>
  ))
  .add('GameListCard CANCELED', () => (
    <View>
      <Query
        query={GET_GAME_DETAILS}
        variables={{ uuid: 455 }}
      >
        {({ loading, error, data }) =>
          (loading || error ? null : (
            <GameListCard
              game={Object.assign({}, data.game, { status: 'CANCELED' })}
            />
          ))
        }
      </Query>
    </View>
  ))
  .add('GameListCard PLANNED short title/name', () => (
    <View>
      <Query
        query={GET_GAME_DETAILS}
        variables={{ uuid: 455 }}
      >
        {({ loading, error, data }) =>
          (loading || error ? null : (
            <GameListCard
              game={
                Object.assign(
                  {},
                  data.game,
                  { status: 'PLANNED', name: 'Some Short Name' })}
            />
          ))
        }
      </Query>
    </View>
  ))
  .add('GameListCard CANCELED short title/name', () => (
    <View>
      <Query
        query={GET_GAME_DETAILS}
        variables={{ uuid: 455 }}
      >
        {({ loading, error, data }) =>
          (loading || error ? null : (
            <GameListCard
              game={
                Object.assign(
                  {},
                  data.game,
                  { status: 'CANCELED', name: 'Some Short Name' })}
            />
          ))
        }
      </Query>
    </View>
  ));
