import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { WithApolloMockProvider } from '../../../GraphQL';
import Block from '../../Common/Block';
import SpotsList from './index';

storiesOf('Spots.SpotsList', module)
  .add('SpotsList', () => (
    <WithApolloMockProvider>
      <Block>
        <SpotsList
          sport="soccer"
        />
      </Block>
    </WithApolloMockProvider>
  ));
