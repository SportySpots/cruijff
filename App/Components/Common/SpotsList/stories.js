import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { WithApolloMockProvider } from '../../../GraphQL';
import Block from '../Block';
import SpotsList from './index';

storiesOf('Common.SpotsList', module)
  .add('SpotsList', () => (
    <WithApolloMockProvider>
      <Block>
        <SpotsList
          sport="soccer"
        />
      </Block>
    </WithApolloMockProvider>
  ));
