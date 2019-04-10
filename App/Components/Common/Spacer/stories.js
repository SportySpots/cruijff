import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Row from '../Row';
import Spacer from '.';

const HorizontalBlock = styled.View`
  height: 100px;
  flex: 1;
  background-color: red;
`;

const VerticalBlock = styled.View`
  flex: 1;
  background-color: red;
`;

storiesOf('Common.Spacer', module)
  .add('Spacer size S row', () => (
    <Row style={{ borderWidth: 1, borderColor: 'blue' }}>
      <HorizontalBlock />
      <Spacer row size="S" />
      <HorizontalBlock />
    </Row>
  ))
  .add('Spacer size M row', () => (
    <Row style={{ borderWidth: 1, borderColor: 'blue' }}>
      <HorizontalBlock />
      <Spacer row size="M" />
      <HorizontalBlock />
    </Row>
  ))
  .add('Spacer size L row', () => (
    <Row style={{ borderWidth: 1, borderColor: 'blue' }}>
      <HorizontalBlock />
      <Spacer row size="L" />
      <HorizontalBlock />
    </Row>
  ))
  .add('Spacer size S', () => (
    <View style={{ flex: 1, borderWidth: 1, borderColor: 'blue' }}>
      <VerticalBlock />
      <Spacer size="S" />
      <VerticalBlock />
    </View>
  ))
  .add('Spacer size M', () => (
    <View style={{ flex: 1, borderWidth: 1, borderColor: 'blue' }}>
      <VerticalBlock />
      <Spacer size="M" />
      <VerticalBlock />
    </View>
  ))
  .add('Spacer size L', () => (
    <View style={{ flex: 1, borderWidth: 1, borderColor: 'blue' }}>
      <VerticalBlock />
      <Spacer size="L" />
      <VerticalBlock />
    </View>
  ));
