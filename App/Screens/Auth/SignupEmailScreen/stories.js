import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import GET_USER_DETAILS from '../../../GraphQL/Users/Queries/GET_USER_DETAILS';
import navigation from './mocks';
import SignupEmailScreen from '.';

storiesOf('Screen.Auth', module)
  .add('SignupEmailScreen', () => (
    <Query
      query={GET_USER_DETAILS}
      variables={{ uuid: 455 }}
    >
      {({ loading, error, data }) =>
        (loading || error ? null : (
          <SignupEmailScreen user={data.user} navigation={navigation} />
        ))
      }
    </Query>
  ));
