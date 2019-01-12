import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Images from '../../../Themes/Images';
import ImageSlide from '.';

storiesOf('Onboarding.ImageSlide', module)
  .add('ImageSlide', () => (
    <ImageSlide
      title="I'm the title"
      text="I'm the text"
      image={Images.illustrationWizard1}
    />
  ));
