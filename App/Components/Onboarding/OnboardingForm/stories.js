import { storiesOf } from '@storybook/react-native';
import React from 'react';
import OnboardingForm from '.';

const dummyNavigation = {
  goBack: () => {},
  navigate: () => {},
};

storiesOf('Onboarding.OnboardingForm', module)
  .add('OnboardingForm', () => (
    <OnboardingForm navigation={dummyNavigation} />
  ));
