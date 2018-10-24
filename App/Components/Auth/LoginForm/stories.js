import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import GET_USER_DETAILS from '../../../GraphQL/Users/Queries/GET_USER_DETAILS';
import LoginForm from '.';

storiesOf('Auth.LoginForm', module)
  .add('LoginForm', () => (
    <Query
      query={GET_USER_DETAILS}
      variables={{ uuid: 455 }}
    >
      {({ loading, error, data }) =>
        (loading || error ? null : (
          <LoginForm user={data.user} />
        ))
      }
    </Query>
  ));
