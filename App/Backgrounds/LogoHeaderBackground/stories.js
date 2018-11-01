import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';
import LogoHeaderBackground from '.';

storiesOf('Backgrounds.LogoHeaderBackground', module)
  .add('LogoHeaderBackground green theme', () => (
    <LogoHeaderBackground theme="green">
      <Text>contents</Text>
    </LogoHeaderBackground>
  ))
  .add('LogoHeaderBackground white theme', () => (
    <LogoHeaderBackground>
      <Text>contents</Text>
    </LogoHeaderBackground>
  ));
