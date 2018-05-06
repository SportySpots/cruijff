import React from 'react'
import { storiesOf } from '@storybook/react-native'
import LogoHeaderBackground from './LogoHeaderBackground'
import Text from '../Components/Text'
import FieldBackground from './FieldBackground'
import { View } from 'react-native'

storiesOf('Backgrounds')
  .add('LogoHeader', () => (
    <LogoHeaderBackground>
      <Text>contents</Text>
    </LogoHeaderBackground>
  ))
  .add('FieldBackground', () => (
    <FieldBackground>
      <View />
    </FieldBackground>
  ))
