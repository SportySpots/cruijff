import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import GET_USER_DETAILS from '../../../GraphQL/Users/Queries/GET_USER_DETAILS';
import navigation from './mocks';
import ProfileEditScreen from '.';

storiesOf('Screens.Profile', module)
  .add('ProfileEditScreen', () => (
    <Query
      query={GET_USER_DETAILS}
      variables={{ uuid: 455 }}
    >
      {({ loading, error, data }) => (
        loading || error ? null : (
          <ProfileEditScreen
            navigation={navigation}
            user={data.user}
          />
        ))
      }
    </Query>
  ));
