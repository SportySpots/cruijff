import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import ShareGameButton from '.';

storiesOf('Games.ShareGameButton', module)
  .add('ShareGameButton default', () => (
    <Query
      query={GET_GAME_DETAILS}
      variables={{ uuid: 455 }}
    >
      {({ loading, error, data }) => (
        loading || error ? null : (
          <ShareGameButton variant="facebook" gameUUID={data.game.uuid} />
        ))
      }
    </Query>
  ));
