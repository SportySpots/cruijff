import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import RoundButton from '.';

storiesOf('Common.RoundButton', module)
  .add('RoundButton default', () => (
    <RoundButton iconName="plus" />
  ))
  .add('RoundButton primary', () => (
    <RoundButton status="primary" iconName="plus" />
  ))
  .add('RoundButton translucid', () => (
    <View style={{ height: 100, backgroundColor: 'black' }}>
      <RoundButton status="translucid" iconName="plus" />
    </View>
  ))
  .add('RoundButton primary reverse', () => (
    <RoundButton status="primary" reverse iconName="plus" />
  ))
  .add('RoundButton secondary', () => (
    <RoundButton status="secondary" iconName="plus" />
  ))
  .add('RoundButton info', () => (
    <RoundButton status="info" iconName="plus" />
  ))
  .add('RoundButton warning', () => (
    <RoundButton status="warning" iconName="plus" />
  ))
  .add('RoundButton warning reverse', () => (
    <RoundButton status="warning" reverse iconName="plus" />
  ))
  .add('RoundButton ghost', () => (
    <RoundButton status="ghost" iconName="plus" />
  ))
  .add('RoundButton dark', () => (
    <RoundButton status="dark" iconName="plus" />
  ))
  .add('RoundButton ghost disabled', () => (
    <RoundButton status="ghost" disabled iconName="plus" />
  ))
  .add('RoundButton disabled', () => (
    <RoundButton disabled iconName="plus" />
  ))
  .add('RoundButton primary small', () => (
    <RoundButton
      status="primary"
      size="S"
      iconName="plus"
      width={120}
    />
  ));
