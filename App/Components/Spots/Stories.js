import React from 'react'
import { storiesOf } from '@storybook/react-native'
import SpotListCard from './SpotListCard'
import SpotListCardSmall from './SpotListCardSmall'
import Spot from './Spot'
import SpotList, { GET_SPOTS } from './SpotList'
import { WithApolloMockProvider } from '../../GraphQL'
import SpotProperties from './SpotProperties'

import { Query } from 'react-apollo'

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
  .add('SpotList', () => (
    <WithApolloMockProvider>
      <SpotList navigation={dummyNavigator} />
    </WithApolloMockProvider>
  ))
  .add('Spot', () => (
    <WithApolloMockProvider>
      <Spot uuid={1} navigation={dummyNavigator} />
    </WithApolloMockProvider>
  ))
  .add('SpotProperties', () => <SpotProperties properties={spotProperties} />)
