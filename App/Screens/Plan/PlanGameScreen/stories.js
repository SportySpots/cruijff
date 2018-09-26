import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { WithApolloMockProvider } from '../../../GraphQL';
import PlanGameScreen from './index';

const dummyNavigation = {
  goBack: () => {},
  navigate: () => {},
};

storiesOf('Screens.Plan.PlanGameScreen', module)
  .add('PlanGameScreen', () => (
    <WithApolloMockProvider>
      <PlanGameScreen navigation={dummyNavigation} />
    </WithApolloMockProvider>
  ));
