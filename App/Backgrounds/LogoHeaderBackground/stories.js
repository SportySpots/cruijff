import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';
import LogoHeaderBackground from '.';

storiesOf('Backgrounds.LogoHeader', module)
  .add('LogoHeader green theme', () => (
    <LogoHeaderBackground theme="green">
      <Text>contents</Text>
    </LogoHeaderBackground>
  ))
  .add('LogoHeader white theme', () => (
    <LogoHeaderBackground>
      <Text>contents</Text>
    </LogoHeaderBackground>
  ));
