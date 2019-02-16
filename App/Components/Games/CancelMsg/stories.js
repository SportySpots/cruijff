import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CancelMsg from '.';

storiesOf('Games.CancelMsg', module)
  .add('CancelMsg', () => (
    <CancelMsg characterRestriction={120} />
  ));
