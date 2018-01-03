import React from 'react'
import { storiesOf } from '@storybook/react-native'

import FieldBackground from '../FieldBackground'
import { View } from 'react-native'

storiesOf('FieldBackground')
  .add('Default', () => (
    <FieldBackground>
      <View />
    </FieldBackground>
  ))
