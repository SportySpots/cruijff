import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import GET_USER_DETAILS from '../../../GraphQL/Users/Queries/GET_USER_DETAILS';
import ProfileTabs from '.';

storiesOf('Profile.ProfileTabs', module)
  .add('ProfileTabs', () => (
    <Query
      query={GET_USER_DETAILS}
      variables={{ uuid: 455 }}
    >
      {({ loading, error, data }) =>
        (loading || error ? null : (
          <ProfileTabs user={data.user} />
        ))
      }
    </Query>
  ));
