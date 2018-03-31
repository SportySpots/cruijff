import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Card from './Card'
import CardSmall from './CardSmall'
import CardDetail from './CardDetail'
import CardList from './CardList'
import PropertyCircle from './PropertyCircle'
import { View } from 'react-native'

const spots = require('../../../App/Fixtures/spots.json')

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { spotId: 455 }
  }
}

storiesOf('Cards')
  .add('Single list card', () => <Card onPress={() => {}} spot={spots[0]} />)
  .add('Single small card', () => (
    <CardSmall onPress={() => {}} spot={spots[0]} />
  ))
  .add('Card list', () => (
    <CardList navigation={dummyNavigator} spots={spots} />
  ))
  .add('Detail Card', () => <CardDetail navigation={dummyNavigator} />)
  .add('Propertycircle', () => (
    <View>
      {[
        'blablabla',
        'ASD GDS ASD DAS',
        'as asdasdasdsadassadas',
        '+4',
        'HMMMM'
      ].map((text, idx) => <PropertyCircle text={text} key={idx} />)}
    </View>
  ))
