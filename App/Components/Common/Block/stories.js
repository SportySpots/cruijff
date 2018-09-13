import { storiesOf } from '@storybook/react-native';
import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';
import Colors from '../../../Themes/Colors';
import Block from './index';

storiesOf('Common.Block', module)
  .add('Block', () => (
    <Block bgColor="green">
      <Text>I&apos;m inside a Block :)</Text>
    </Block>
  ))
  .add('Block 100px fixed height', () => (
    <Block bgColor="green" height={100}>
      <Text>I&apos;m inside a Block :)</Text>
      <Text>with fixed height</Text>
    </Block>
  ))
  .add('Block 100px fixed height bgColor gray', () => (
    <Block height={100} bgColor={Colors.gray}>
      <Text>I&apos;m inside a Block :)</Text>
      <Text>with fixed height</Text>
    </Block>
  ));
