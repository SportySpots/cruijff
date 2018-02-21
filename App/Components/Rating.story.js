import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Rating from './Rating'

storiesOf('Rating')
  .add('1', () => <Rating rating={1} />)
  .add('3', () => <Rating rating={3} />)
  .add('4.5', () => <Rating rating={4.5} />)
