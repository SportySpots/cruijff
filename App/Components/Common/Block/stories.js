import { storiesOf } from '@storybook/react-native';
import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';
import Block from './index';

const Container = styled.View`
  border: 1px solid black;
`;

storiesOf('Common.Block', module)
  .add('Block', () => (
    <Block>
      <Text>I&apos;m inside a Block :)</Text>
    </Block>
  ))
  .add('Block 100px fixed height', () => (
    <Container>
      <Block height={100}>
        <Text>I&apos;m inside a Block :)</Text>
        <Text>with fixed height</Text>
      </Block>
    </Container>
  ));
