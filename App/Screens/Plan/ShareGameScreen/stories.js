import { storiesOf } from '@storybook/react-native';
import React from 'react';
import ShareGameScreen from '.';

const dummyNavigation = {
  goBack: () => {},
  navigate: () => {},
  state: {
    params: {
      uuid: '455',
    },
  },
};

storiesOf('Screens.Plan.ShareGameScreen', module)
  .add('ShareGameScreen', () => (
    <ShareGameScreen navigation={dummyNavigation} />
  ));
