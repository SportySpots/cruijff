import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Colors from '../../../Themes/Colors';
import { WithApolloMockProvider } from '../../../GraphQL';
import Block from '../../Common/Block';
import SpotsList from './index';

storiesOf('Spots.SpotsList', module)
  .add('SpotsList', () => (
    <WithApolloMockProvider>
      <Block bgColor={Colors.lightGray}>
        <SpotsList
          sport="SOCCER"
        />
      </Block>
    </WithApolloMockProvider>
  ));
