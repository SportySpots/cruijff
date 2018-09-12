import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Provider } from 'react-redux';
import { View } from 'react-native';

import { store, navigation } from './mocks';
import CancelGameScreen from '.';

import { WithApolloMockProvider } from '../../../GraphQL';

storiesOf('Screens.Games', module)
  .add('CancelGameScreen', () => (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <WithApolloMockProvider>
          <CancelGameScreen
            navigation={navigation}
          />
        </WithApolloMockProvider>
      </Provider>
    </View>
  ));
