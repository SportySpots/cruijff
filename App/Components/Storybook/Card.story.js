import React from 'react'
import { storiesOf } from '@storybook/react-native'
import styles from '../../Containers/Screens/Styles/FindSpot'

import Card from '../Cards/Card'

storiesOf('Card')
  .add('Default', () => (
    <Card
      spot={{
        name: 'Cool!'
      }}
      style={styles.card}
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
