import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import Row from '../Row';
import Spacer from './index';

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
  .add('Spacer size S direction row', () => (
    <Row style={{ borderWidth: 1, borderColor: 'blue' }}>
      <HorizontalBlock />
      <Spacer size="S" orientation="row" />
      <HorizontalBlock />
    </Row>
  ))
  .add('Spacer size M direction row', () => (
    <Row style={{ borderWidth: 1, borderColor: 'blue' }}>
      <HorizontalBlock />
      <Spacer size="M" orientation="row" />
      <HorizontalBlock />
    </Row>
  ))
  .add('Spacer size L direction row', () => (
    <Row style={{ borderWidth: 1, borderColor: 'blue' }}>
      <HorizontalBlock />
      <Spacer size="L" orientation="row" />
      <HorizontalBlock />
    </Row>
  ))
  .add('Spacer size S direction column', () => (
    <View style={{ flex: 1, borderWidth: 1, borderColor: 'blue' }}>
      <VerticalBlock />
      <Spacer size="S" orientation="column" />
      <VerticalBlock />
    </View>
  ))
  .add('Spacer size M direction column', () => (
    <View style={{ flex: 1, borderWidth: 1, borderColor: 'blue' }}>
      <VerticalBlock />
      <Spacer size="M" orientation="column" />
      <VerticalBlock />
    </View>
  ))
  .add('Spacer size L direction column', () => (
    <View style={{ flex: 1, borderWidth: 1, borderColor: 'blue' }}>
      <VerticalBlock />
      <Spacer size="L" orientation="column" />
      <VerticalBlock />
    </View>
  ));
