import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import AdminMenu from '.';

const Container = () => (
  <Query
    query={GET_GAME_DETAILS}
    variables={{ uuid: 455 }}
  >
    {({ loading, error, data }) =>
      (loading || error ? null : (
        <AdminMenu
          // attendees={getAdminMenu(data.game.attendees) || []}
          // maxLength={maxLength}
        />
      ))
    }
  </Query>
);

storiesOf('Games.AdminMenu', module)
  .add('AdminMenu', () => (
    <Container />
  ));
