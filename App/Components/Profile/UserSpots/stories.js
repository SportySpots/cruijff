import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import GET_USER_DETAILS from '../../../GraphQL/Users/Queries/GET_USER_DETAILS';
import UserSpots from '.';

storiesOf('Profile.UserSpots', module)
  .add('UserSpots', () => (
    <Query
      query={GET_USER_DETAILS}
      variables={{ uuid: 455 }}
    >
      {({ loading, error, data }) => (
        loading || error ? null : (
          <UserSpots spots={data.user.profile.spots} />
        ))
      }
    </Query>
  ))
  .add('UserSpots no results', () => <UserSpots spots={[]} />);
