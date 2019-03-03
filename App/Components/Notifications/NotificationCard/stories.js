import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import GET_SPOT_DETAILS from '../../../GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import NotificationCard from '.';

storiesOf('Notifications.NotificationCard', module)
  .add('NotificationCard', () => (
    <Query
      query={GET_SPOT_DETAILS}
      variables={{ uuid: 455 }}
    >
      {({ loading, error, data }) => (
        loading || error ? null : (
          <NotificationCard
            notification={{ image: data.spot.images[0] }}
          />
        ))
      }
    </Query>
  ));