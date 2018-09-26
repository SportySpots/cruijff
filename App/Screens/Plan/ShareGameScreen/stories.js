import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { WithApolloMockProvider } from '../../../GraphQL';
import ShareGameScreen from './index';

const dummyNavigation = {
  goBack: () => {},
  navigate: () => {},
  state: {
    params: {
      uuid: 455,
    },
  },
};

storiesOf('Screens.Plan.ShareGameScreen', module)
  .add('ShareGameScreen', () => (
    <WithApolloMockProvider>
      <ShareGameScreen navigation={dummyNavigation} />
    </WithApolloMockProvider>
  ));
