import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { WithApolloMockProvider } from '../../../GraphQL';
import Block from '../Block';
import SportsList from './index';

storiesOf('Common.SportsList', module)
  .add('SportsList', () => (
    <WithApolloMockProvider>
      <Block>
        <SportsList />
      </Block>
    </WithApolloMockProvider>
  ));
