import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { WithApolloMockProvider } from '../../../GraphQL';
import PlanGameScreen from './index';

storiesOf('Screens.Plan.PlanGameScreen', module)
  .add('PlanGameScreen', () => (
    <WithApolloMockProvider>
      <PlanGameScreen />
    </WithApolloMockProvider>
  ));
