/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import { WithApolloMockProvider } from '../../GraphQL';
import GET_SPOT_DETAILS from '../../GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import GET_SPOTS from '../../GraphQL/Spots/Queries/GET_SPOTS';
import SpotListCard from './SpotListCard';
import SpotListCardSmall from './SpotListCardSmall';
import SpotMap from './SpotMap';
import SpotProperties from './SpotDetails/SpotProperties';

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { spotId: 455 },
  },
};


storiesOf('Spots', module)
  .add('SpotListCard', () => (
    <WithApolloMockProvider>
      <Query query={GET_SPOTS}>
        {({ loading, error, data }) =>
          (loading || error ? null : (
            <SpotListCard spot={data.spots[0]} navigation={dummyNavigator} />
          ))
        }
      </Query>
    </WithApolloMockProvider>
  ))
  .add('SpotListCardSmall', () => (
    <WithApolloMockProvider>
      <Query query={GET_SPOTS}>
        {({ loading, error, data }) =>
          (loading || error ? null : (
            <SpotListCardSmall spot={data.spots[0]} navigation={dummyNavigator} />
          ))
        }
      </Query>
    </WithApolloMockProvider>
  ))

  .add('SpotProperties', () => (
    <WithApolloMockProvider>
      <Query query={GET_SPOT_DETAILS}>
        {({ loading, error, data }) =>
          (loading || error ? null : (
            <SpotProperties spot={data.spots[0]} navigation={dummyNavigator} />
          ))
        }
      </Query>
    </WithApolloMockProvider>
  ))
  .add('SpotMap', () => (
    <WithApolloMockProvider>
      <Query query={GET_SPOT_DETAILS} variables={{ uuid: dummyNavigator.state.params.spotId }}>
        {({ loading, error, data }) => (loading || error ? null : <SpotMap spot={data.spot} />)}
      </Query>
    </WithApolloMockProvider>
  ));
