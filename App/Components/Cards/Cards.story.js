import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Card from './Card'
import CardList from './CardList'

const spots = require('../../../App/Mocks/spots.json')

storiesOf('Cards')
  .add('Single card', () => (
    <Card
      onPress={() => { }}
      spot={spots[0]}
    />
  ))

  .add('Card list', () => (
    <CardList
      spots={spots}
    />
  ))
