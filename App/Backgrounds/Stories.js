/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import Text from '../Components/Common/Text';
import FieldBackground from './FieldBackground';
import LogoHeaderBackground from './LogoHeaderBackground';

storiesOf('Backgrounds', module)
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
