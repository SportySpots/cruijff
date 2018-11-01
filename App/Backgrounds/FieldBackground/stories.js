import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';
import FieldBackground from '.';

storiesOf('Backgrounds.FieldBackground', module)
  .add('FieldBackground', () => (
    <FieldBackground>
      <Text>contents</Text>
    </FieldBackground>
  ));
