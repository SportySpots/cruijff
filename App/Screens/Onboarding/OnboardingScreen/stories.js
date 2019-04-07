import { storiesOf } from '@storybook/react-native';
import React from 'react';
import OnboardingScreen from '.';

const dummyNavigation = {
  goBack: () => {},
  navigate: () => {},
};

storiesOf('Screens.Onboarding', module)
  .add('OnboardingScreen', () => (
    <OnboardingScreen navigation={dummyNavigation} />
  ));
