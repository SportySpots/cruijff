import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import GET_USER_DETAILS from '../../../GraphQL/Users/Queries/GET_USER_DETAILS';
import SignupForm from '.';

storiesOf('Auth.SignupForm', module)
  .add('SignupForm', () => (
    <Query
      query={GET_USER_DETAILS}
      variables={{ uuid: 455 }}
    >
      {({ loading, error, data }) =>
        (loading || error ? null : (
          <SignupForm user={data.user} />
        ))
      }
    </Query>
  ));
