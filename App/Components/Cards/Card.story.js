import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Card from './Card'

storiesOf('Card')
  .add('Default', () => (
    <Card
      spot={{
        name: 'Cool!'
      }}
    />
  ))
  .add('Custom Style', () => (
    <Card
      spot={{
        name: 'Cool!'
      }}
      style={{ backgroundColor: 'red' }}
    />
  ))
