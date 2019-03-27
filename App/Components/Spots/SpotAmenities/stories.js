import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import GET_SPOT_DETAILS from '../../../GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import SpotAmenities from '.';

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { uuid: 455 },
  },
};

storiesOf('Spots.SpotAmenities', module)
  .add('SpotAmenities', () => (
    <Query
      query={GET_SPOT_DETAILS}
      variables={{ uuid: dummyNavigator.state.params.uuid }}
    >
      {({ loading, error, data }) => (
        loading || error ? null : (
          <SpotAmenities spot={data.spot} navigation={dummyNavigator} />
        ))
      }
    </Query>
  ));
