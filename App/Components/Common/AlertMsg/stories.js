import { storiesOf } from '@storybook/react-native';
import React from 'react';
import AlertMsg from '.';

const text = 'This is an alert component!';

storiesOf('Common.AlertMsg', module)
  .add('AlertMsg success', () => (
    <AlertMsg status="success" value={text} />
  ))
  .add('AlertMsg error', () => (
    <AlertMsg status="error" value={text} />
  ))
  .add('AlertMsg warning', () => (
    <AlertMsg status="warning" value={text} />
  ))
  .add('AlertMsg info', () => (
    <AlertMsg status="info" value={text} />
  ))
  .add('AlertMsg info long text', () => (
    <AlertMsg status="info" value={`${text} ${text} ${text} ${text} ${text}`} />
  ));
