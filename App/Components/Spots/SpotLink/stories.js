import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import GET_SPOT_DETAILS from '../../../GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import SpotLink from './index';

storiesOf('Spots.SpotLink', module)
  .add('SpotLink', () => (
    <Query
      query={GET_SPOT_DETAILS}
      variables={{ uuid: 455 }}
    >
      {({ loading, error, data }) =>
      (loading || error ? null : (
        <SpotLink spot={data.spot} />
        ))
      }
    </Query>
  ));

