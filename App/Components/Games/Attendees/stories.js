import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import Attendees from '.';
import { getAttendees } from '../utils';

storiesOf('Games.Attendees', module)
  .add('Attendees', () => (
    <Query
      query={GET_GAME_DETAILS}
      variables={{ uuid: 455 }}
    >
      {({ loading, error, data }) =>
        (loading || error ? null : (
          <Attendees
            attendees={getAttendees(data.game.attendees) || []}
          />
        ))
      }
    </Query>
  ));
