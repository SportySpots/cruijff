import { storiesOf } from '@storybook/react-native';
import React from 'react';
import AlertMsg from '.';

const text = 'This is an alert component!';

storiesOf('AlertMsg', module)
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
  ));
