import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import { Query } from 'react-apollo';
import { WithApolloMockProvider } from '../../../GraphQL';
import GET_SPOT_DETAILS from '../../../GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import SpotImage from './index';

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { spotId: 455 },
  },
};

storiesOf('Spots.SpotImage', module)
  .add('SpotImage', () => (
    <WithApolloMockProvider>
      <Query
        query={GET_SPOT_DETAILS}
        variables={{ uuid: dummyNavigator.state.params.spotId }}
      >
        {({ loading, error, data }) =>
        (loading || error ? null : (
          <View style={{ height: 100 }}>
            <SpotImage spot={data.spot} />
          </View>
          ))
        }
      </Query>
    </WithApolloMockProvider>
  ));
