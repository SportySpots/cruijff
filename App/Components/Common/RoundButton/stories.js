import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import RoundButton from '.';

storiesOf('Common.RoundButton', module)
  .add('RoundButton default', () => (
    <RoundButton
      iconSet="MaterialCommunityIcons"
      iconName="plus"
    />
  ))
  .add('RoundButton primary', () => (
    <RoundButton
      status="primary"
      iconSet="MaterialCommunityIcons"
      iconName="plus"
    />
  ))
  .add('RoundButton translucid', () => (
    <View style={{ height: 100, backgroundColor: 'black' }}>
      <RoundButton
        status="translucid"
        iconSet="MaterialCommunityIcons"
        iconName="plus"
      />
    </View>
  ))
  .add('RoundButton primary reverse', () => (
    <RoundButton
      status="primary"
      reverse
      iconSet="MaterialCommunityIcons"
      iconName="plus"
    />
  ))
  .add('RoundButton secondary', () => (
    <RoundButton
      status="secondary"
      iconSet="MaterialCommunityIcons"
      iconName="plus"
    />
  ))
  .add('RoundButton info', () => (
    <RoundButton
      status="info"
      iconSet="MaterialCommunityIcons"
      iconName="plus"
    />
  ))
  .add('RoundButton warning', () => (
    <RoundButton
      status="warning"
      iconSet="MaterialCommunityIcons"
      iconName="plus"
    />
  ))
  .add('RoundButton warning reverse', () => (
    <RoundButton
      status="warning"
      reverse
      iconSet="MaterialCommunityIcons"
      iconName="plus"
    />
  ))
  .add('RoundButton ghost', () => (
    <RoundButton
      status="ghost"
      iconSet="MaterialCommunityIcons"
      iconName="plus"
    />
  ))
  .add('RoundButton dark', () => (
    <RoundButton
      status="dark"
      iconSet="MaterialCommunityIcons"
      iconName="plus"
    />
  ))
  .add('RoundButton ghost disabled', () => (
    <RoundButton
      status="ghost"
      disabled
      iconSet="MaterialCommunityIcons"
      iconName="plus"
    />
  ))
  .add('RoundButton disabled', () => (
    <RoundButton
      disabled
      iconSet="MaterialCommunityIcons"
      iconName="plus"
    />
  ))
  .add('RoundButton primary small', () => (
    <RoundButton
      status="primary"
      size="S"
      iconSet="MaterialCommunityIcons"
      iconName="plus"
      width={120}
    />
  ));
