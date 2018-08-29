/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { View } from 'react-native';

import CancelGameScreen from '.';

import { WithApolloMockProvider } from '../../../GraphQL';


const store = createStore(state => state, {
  user: {
    uuid: 'f0db3473-9fde-42c0-a107-d9c9758f1926',
  },
});

// const dummyNavigator = {
//   navigate: () => null,
//   state: {
//     params: { uuid: 1 },
//   },
// };
//
// const store = createStore(state => state, {
//   spotFilters: {
//     maxDistance: 2.0,
//     sports: {},
//   },
// });

storiesOf('Screens.Games', module)
  .add('CancelGameScreen', () => (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <WithApolloMockProvider>
          {

          }
          <CancelGameScreen
            navigation={{
              state: { params: { uuid: 'cdfa268a-e809-43be-a659-bd2310737bab' } },
            }}
          />
        </WithApolloMockProvider>
      </Provider>
    </View>
  ));
