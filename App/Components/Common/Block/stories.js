import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';
import Block from '.';

storiesOf('Common.Block', module)
  .add('Block', () => (
    <Block bgColor="grass">
      <Text>I&apos;m inside a Block :)</Text>
    </Block>
  ))
  .add('Block 100px fixed height', () => (
    <Block bgColor="grass" height={100}>
      <Text>I&apos;m inside a Block :)</Text>
      <Text>with fixed height</Text>
    </Block>
  ))
  .add('Block 100px fixed height bgColor gray', () => (
    <Block bgColor="gray" height={100}>
      <Text>I&apos;m inside a Block :)</Text>
      <Text>with fixed height</Text>
    </Block>
  ));
