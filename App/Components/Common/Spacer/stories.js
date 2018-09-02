import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import Spacer from './index';
import { HorizontalView } from '../../Games/style';

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
    <HorizontalView style={{ borderWidth: 1, borderColor: 'blue' }}>
      <HorizontalBlock />
      <Spacer size="S" direction="row" />
      <HorizontalBlock />
    </HorizontalView>
  ))
  .add('Spacer size M direction row', () => (
    <HorizontalView style={{ borderWidth: 1, borderColor: 'blue' }}>
      <HorizontalBlock />
      <Spacer size="M" direction="row" />
      <HorizontalBlock />
    </HorizontalView>
  ))
  .add('Spacer size L direction row', () => (
    <HorizontalView style={{ borderWidth: 1, borderColor: 'blue' }}>
      <HorizontalBlock />
      <Spacer size="L" direction="row" />
      <HorizontalBlock />
    </HorizontalView>
  ))
  .add('Spacer size S direction column', () => (
    <View style={{ flex: 1, borderWidth: 1, borderColor: 'blue' }}>
      <VerticalBlock />
      <Spacer size="S" direction="column" />
      <VerticalBlock />
    </View>
  ))
  .add('Spacer size M direction column', () => (
    <View style={{ flex: 1, borderWidth: 1, borderColor: 'blue' }}>
      <VerticalBlock />
      <Spacer size="M" direction="column" />
      <VerticalBlock />
    </View>
  ))
  .add('Spacer size L direction column', () => (
    <View style={{ flex: 1, borderWidth: 1, borderColor: 'blue' }}>
      <VerticalBlock />
      <Spacer size="L" direction="column" />
      <VerticalBlock />
    </View>
  ));