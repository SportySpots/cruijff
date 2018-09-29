import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import { Query } from 'react-apollo';
import GET_SPOT_DETAILS from '../../../GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import SpotImage from './index';

storiesOf('Spots.SpotImage', module)
  .add('SpotImage', () => (
    <Query
      query={GET_SPOT_DETAILS}
      variables={{ uuid: 455 }}
    >
      {({ loading, error, data }) =>
      (loading || error ? null : (
        <View style={{ height: 100 }}>
          <SpotImage spot={data.spot} />
        </View>
        ))
      }
    </Query>
  ));
