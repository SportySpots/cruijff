import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import OrganizerAndDescription from '.';

storiesOf('Common.OrganizerAndDescription', module)
  .add('OrganizerAndDescription', () => (
    <Query
      query={GET_GAME_DETAILS}
      variables={{ uuid: 455 }}
    >
      {({ loading, error, data }) =>
        (loading || error ? null : (
          <OrganizerAndDescription
            organizer={data.game.organizer}
            description={data.game.description}
          />
        ))
      }
    </Query>
  ));

