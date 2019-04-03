import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Icon from '.';

storiesOf('common.Icon', module)
  .add('Icon size 30', () => (
    <Icon
      iconSet="MaterialIcons"
      iconName="bug-report"
      size={30}
    />
  ))
  .add('Icon primaryGreen', () => (
    <Icon
      iconSet="MaterialIcons"
      iconName="bug-report"
      color="primaryGreen"
    />
  ));
