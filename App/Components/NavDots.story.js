import React from 'react'
import { storiesOf } from '@storybook/react-native'
import NavDots from './NavDots'

storiesOf('NavDots')
  .add('Default', () => (
    <NavDots
      count={5}
      active={3}
      theme='light'
    />
  ))
