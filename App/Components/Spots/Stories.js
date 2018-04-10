import React from 'react'
import { storiesOf } from '@storybook/react-native'
import SpotListCard from './SpotListCard'
import SpotListCardSmall from './SpotListCardSmall'
import Spot from './Spot'
import SpotList from './SpotList'

const spots = require('../../../App/Fixtures/spots.json')

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { spotId: 455 }
  }
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
