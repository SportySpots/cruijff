import React from 'react'
import { storiesOf } from '@storybook/react-native'
import SpotListCard from './SpotListCard'
import SpotListCardSmall from './SpotListCardSmall'
import Spot, { GET_SPOT_DETAILS } from './Spot'
import SpotsListScreen, { GET_SPOTS } from '../../Screens/Spots/SpotsListScreen'
import SpotMap from './SpotMap'
import { WithApolloMockProvider } from '../../GraphQL'
import SpotProperties from './SpotProperties'

import { Query } from 'react-apollo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { spotId: 455 }
  }
}
const spotProperties = {
  Sport: 'Voetbal',
  Locatie: 'Plantsoen',
  Oppervlakte: '759m2',
  Ondergrond: 'Beton',
  Omheining: 'Open',
  Verlichting: 'Ja'
}

const store = createStore(state => state, {
  user: {
    uuid: 1234,
    initialized: true
  }
})

storiesOf('Spots')
  .add('SpotListCard', () => (
    <WithApolloMockProvider>
      <Query query={GET_SPOTS}>
        {({ loading, error, data }) =>
          loading || error ? null : (
            <SpotListCard spot={data.spots[0]} navigation={dummyNavigator} />
          )
        }
      </Query>
    </WithApolloMockProvider>
  ))
  .add('SpotListCardSmall', () => (
    <WithApolloMockProvider>
      <Query query={GET_SPOTS}>
        {({ loading, error, data }) =>
          loading || error ? null : (
            <SpotListCardSmall
              spot={data.spots[0]}
              navigation={dummyNavigator}
            />
          )
        }
      </Query>
    </WithApolloMockProvider>
  ))
  .add('SpotsListScreen', () => (
    <WithApolloMockProvider>
      <SpotsListScreen navigation={dummyNavigator} />
    </WithApolloMockProvider>
  ))
  .add('Spot', () => (
    <Provider store={store}>
      <WithApolloMockProvider>
        <Spot uuid={1} navigation={dummyNavigator} />
      </WithApolloMockProvider>
    </Provider>
  ))
  .add('SpotProperties', () => <SpotProperties properties={spotProperties} />)
  .add('SpotMap', () => (
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
