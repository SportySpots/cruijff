import React from 'react'
import { storiesOf } from '@storybook/react-native'
import ImageSlider from './ImageSlider'

const spots = require('../../../App/Mocks/spots.json')

storiesOf('Image slider')
  .add('default', () => (
    <ImageSlider
      style={{flex: 1}}
      images={spots[0].images}
    />
  ))
