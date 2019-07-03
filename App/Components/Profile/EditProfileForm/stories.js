import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import GET_USER_DETAILS from '../../../GraphQL/Users/Queries/GET_USER_DETAILS';
import EditProfileForm from '.';

storiesOf('Profile.EditProfileForm', module)
  .add('EditProfileForm', () => (
    <Query
      query={GET_USER_DETAILS}
      variables={{ uuid: '455' }}
    >
      {({ loading, error, data }) => (
        loading || error ? null : (
          <EditProfileForm
            user={data.user}
s          />
        ))
      }
    </Query>
  ));
