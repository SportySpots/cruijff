import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import { WithApolloMockProvider } from '../../../GraphQL';
import GET_SPOT_DETAILS from '../../../GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import SpotLink from './index';

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { spotId: 455 },
  },
};

storiesOf('Spots.SpotLink', module)
  .add('SpotLink', () => (
    <WithApolloMockProvider>
      <Query
        query={GET_SPOT_DETAILS}
        variables={{ uuid: dummyNavigator.state.params.spotId }}
      >
        {({ loading, error, data }) =>
        (loading || error ? null : (
          <SpotLink spot={data.spot} />
          ))
        }
      </Query>
    </WithApolloMockProvider>
  ));

