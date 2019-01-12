import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Images from '../../../Themes/Images';
import OnboardingSlide from '.';

storiesOf('Onboarding.OnboardingSlide', module)
  .add('OnboardingSlide', () => (
    <OnboardingSlide
      title="I'm the title"
      text="I'm the text"
      image={Images.illustrationWizard1}
    />
  ));
