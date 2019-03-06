import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import Avatar from '.';

storiesOf('Common.Avatar', module)
  .add('Avatar with USER', () => (
    <Query
      query={GET_GAME_DETAILS}
      variables={{ uuid: '455' }}
    >
      {({ loading, error, data }) => (
        loading || error ? null : (
          <Avatar user={data.game.organizer} />
        ))
      }
    </Query>
  ))
  .add('Avatar with TEXT', () => (
    <Avatar text="Hola" />
  ))
  .add('Avatar no props', () => (
    <Avatar />
  ));
