import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Calendar from './index';

storiesOf('Common.Calendar', module)
  .add('Calendar', () => (
    <Calendar visible />
  ));
