import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import GET_USER_DETAILS from '../../../GraphQL/Users/Queries/GET_USER_DETAILS';
import ProfileDetails from '.';

storiesOf('Profile.ProfileDetails', module)
  .add('ProfileDetails', () => (
    <Query
      query={GET_USER_DETAILS}
      variables={{ uuid: 455 }}
    >
      {({ loading, error, data }) => (
        loading || error ? null : (
          <ProfileDetails
            user={data.user}
          />
        ))
      }
    </Query>
  ));
