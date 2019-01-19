import { storiesOf } from '@storybook/react-native';
import React from 'react';
import OnboardingScreen from '.';

const dummyNavigation = {
  goBack: () => {},
  navigate: () => {},
};

storiesOf('Screens.Plan.OnboardingScreen', module)
  .add('OnboardingScreen', () => (
    <OnboardingScreen navigation={dummyNavigation} />
  ));
