import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Provider } from 'react-redux';
import { View } from 'react-native';

import { store, navigation } from './mocks';
import GameDetailsScreen from '.';

import { WithApolloMockProvider } from '../../../GraphQL';

storiesOf('Screens.Games', module)
  .add('GameDetailsScreen', () => (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <WithApolloMockProvider>
          <GameDetailsScreen
            navigation={navigation}
          />
        </WithApolloMockProvider>
      </Provider>
    </View>
  ));
