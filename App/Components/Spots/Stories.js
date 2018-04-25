import React from 'react'
import { storiesOf } from '@storybook/react-native'
import SpotListCard from './SpotListCard'
import SpotListCardSmall from './SpotListCardSmall'
import Spot from './Spot'
import SpotList from './SpotList'
import SpotProperties from './SpotProperties'

const spots = require('../../../App/Fixtures/spots.json')

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

storiesOf('Cards')
  .add('SpotListCard', () => (
    <SpotListCard onPress={() => {}} spot={spots[0]} />
  ))
  .add('SpotListCardSmall', () => (
    <SpotListCardSmall onPress={() => {}} spot={spots[0]} />
  ))
  .add('SpotList', () => <SpotList navigation={dummyNavigator} spots={spots} />)
  .add('Spot', () => <Spot navigation={dummyNavigator} />)
  .add('SpotProperties', () => <SpotProperties properties={spotProperties} />)
