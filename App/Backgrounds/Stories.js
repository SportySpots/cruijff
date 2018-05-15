import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import Text from '../Components/Text';
import FieldBackground from './FieldBackground';
import LogoHeaderBackground from './LogoHeaderBackground';

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
  ));
