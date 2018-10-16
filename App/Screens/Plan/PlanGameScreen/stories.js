import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PlanGameScreen from './index';

const dummyNavigation = {
  goBack: () => {},
  navigate: () => {},
};

storiesOf('Screens.Plan.PlanGameScreen', module)
  .add('PlanGameScreen', () => (
    <PlanGameScreen navigation={dummyNavigation} />
  ));
