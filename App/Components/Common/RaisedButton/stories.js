import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Block from '../Block';
import RaisedButton from '.';

storiesOf('Common.RaisedButton', module)
  .add('RaisedButton default', () => (
    <RaisedButton label="label" />
  ))
  .add('RaisedButton default with icon', () => (
    <RaisedButton
      label="label"
      iconSet="MaterialIcons"
      iconName="bug-report"
    />
  ))
  .add('RaisedButton primary', () => (
    <RaisedButton variant="primary" label="label" />
  ))
  .add('RaisedButton secondary', () => (
    <RaisedButton variant="secondary" label="label" />
  ))
  .add('RaisedButton info', () => (
    <RaisedButton variant="info" label="label" />
  ))
  .add('RaisedButton warning', () => (
    <RaisedButton variant="warning" label="label" />
  ))
  .add('RaisedButton ghost', () => (
    <RaisedButton variant="ghost" label="label" />
  ))
  .add('RaisedButton transparent', () => (
    <Block bgColor="primaryGreen">
      <RaisedButton variant="transparent" label="label" />
    </Block>
  ))
  .add('RaisedButton ghost disabled', () => (
    <RaisedButton variant="ghost" disabled label="label" />
  ))
  .add('RaisedButton disabled', () => (
    <RaisedButton disabled label="label" />
  ))
  .add('RaisedButton primary small', () => (
    <RaisedButton
      variant="primary"
      size="S"
      label="label"
      width={120}
    />
  ));
