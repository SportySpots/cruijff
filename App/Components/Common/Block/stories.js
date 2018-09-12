import { storiesOf } from '@storybook/react-native';
import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';
import Colors from '../../../Themes/Colors';
import Block from './index';

const Container = styled.View`
  border: 1px solid green;
  display: flex;
  flex: 1; /* full height */
`;

storiesOf('Common.Block', module)
  .add('Block', () => (
    <Container>
      <Block>
        <Text>I&apos;m inside a Block :)</Text>
      </Block>
    </Container>
  ))
  .add('Block 100px fixed height', () => (
    <Container>
      <Block height={100}>
        <Text>I&apos;m inside a Block :)</Text>
        <Text>with fixed height</Text>
      </Block>
    </Container>
  ))
  .add('Block 100px fixed height bgColor gray', () => (
    <Container>
      <Block height={100} bgColor={Colors.gray}>
        <Text>I&apos;m inside a Block :)</Text>
        <Text>with fixed height</Text>
      </Block>
    </Container>
  ))
  .add('Block flex 1 height bgColor gray', () => (
    <Container>
      <Block flex={1} bgColor={Colors.gray}>
        <Text>I&apos;m inside a Block :)</Text>
        <Text>with fixed height</Text>
      </Block>
    </Container>
  ));
