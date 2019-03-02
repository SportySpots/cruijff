import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import GET_SPOT_DETAILS from '../../../GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import NotificationsList from '.';

storiesOf('Games.NotificationsList', module)
  .add('NotificationsList', () => (
    <Query
      query={GET_SPOT_DETAILS}
      variables={{ uuid: 455 }}
    >
      {({ loading, error, data }) => (
        loading || error ? null : (
          <NotificationsList
            notifications={data.spot.images.map(image => ({ image }))}
            onCardPress={() => {}}
          />
        ))}
    </Query>
  ))
  .add('NotificationsList no items', () => (<NotificationsList />));
