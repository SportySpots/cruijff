import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Icon from '.';

storiesOf('common.Icon', module)
  .add('Icon size 30', () => (
    <Icon
      iconName="bug-report"
      size={30}
    />
  ))
  .add('Icon primaryGreen', () => (
    <Icon
      iconName="bug-report"
      color="primaryGreen"
    />
  ));
