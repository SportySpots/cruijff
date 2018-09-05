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
  /* .add('RaisedButton default fixedWidth 120', () => (
    <RaisedButton label="label" width={120} />
  ))
  .add('RaisedButton default size S', () => (
    <RaisedButton label="label" size="S" />
  ))
  .add('RaisedButton default size L', () => (
    <RaisedButton label="label" size="L" />
  ))
  .add('RaisedButton default size S fixedWidth 120', () => (
    <RaisedButton label="label" size="S" width={120} />
  )); */
