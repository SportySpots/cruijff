import { storiesOf } from '@storybook/react-native';
import React from 'react';
import RaisedButton from './index';

storiesOf('Common.RaisedButton', module)
  .add('RaisedButton default', () => (
    <RaisedButton label="label" />
  ))
  .add('RaisedButton primary', () => (
    <RaisedButton status="primary" label="label" />
  ))
  .add('RaisedButton secondary', () => (
    <RaisedButton status="secondary" label="label" />
  ))
  .add('RaisedButton info', () => (
    <RaisedButton status="info" label="label" />
  ))
  .add('RaisedButton warning', () => (
    <RaisedButton status="warning" label="label" />
  ))
  .add('RaisedButton ghost', () => (
    <RaisedButton status="ghost" label="label" />
  ))
  .add('RaisedButton ghost disabled', () => (
    <RaisedButton status="ghost" disabled label="label" />
  ))
  .add('RaisedButton disabled', () => (
    <RaisedButton disabled label="label" />
  ))
  .add('RaisedButton primary small', () => (
    <RaisedButton
      status="primary"
      size="S"
      label="label"
      width={120}
    />
  ));
