import { storiesOf } from '@storybook/react-native';
import React from 'react';
import DescriptionField from './index';

storiesOf('PlanGame.DescriptionField', module)
  .add('DescriptionField', () => (
    <DescriptionField characterRestriction={120} />
  ));
