import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import GET_SPOT_DETAILS from '../../../GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import { WithApolloMockProvider } from '../../../GraphQL';
import SpotMap from './index';

storiesOf('Spots.SpotMap', module)
  .add('SpotMap', () => (
    <WithApolloMockProvider>
      <Query
        query={GET_SPOT_DETAILS}
        variables={{
          uuid: 455,
          user_uuid: 455,
        }}
      >
        {({ loading, error, data }) =>
          (loading || error ? null : (
            <SpotMap spot={data.spot} />
          ))
        }
        
      </Query>
    </WithApolloMockProvider>
  ));
