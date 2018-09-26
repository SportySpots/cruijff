import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import NavDots from './index';

storiesOf('Common.NavDots', module)
  .add('Default', () => (
    <NavDots count={5} active={3} />
  ));
