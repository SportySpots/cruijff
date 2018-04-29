import React from 'react'
import { storiesOf } from '@storybook/react-native'
import SpotMap from './SpotMap'
import { GET_SPOT_DETAILS } from '../Spots/Spot'
import { WithApolloMockProvider } from '../../GraphQL'
import { Query } from 'react-apollo'

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { spotId: 455 }
  }
}

storiesOf('Maps').add('SpotMap', () => (
  <WithApolloMockProvider>
    <Query
      query={GET_SPOT_DETAILS}
      variables={{ uuid: dummyNavigator.state.params.spotId }}
    >
      {({ loading, error, data }) =>
        loading || error ? null : <SpotMap spot={data.spot} />
      }
    </Query>
  </WithApolloMockProvider>
))
