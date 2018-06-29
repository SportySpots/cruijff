/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { WithApolloMockProvider } from '../GraphQL';

import LoginScreen from './LoginScreen';
import SpotsFilterScreen from './Spots/SpotsFilterScreen';
import InfoScreen from './InfoScreen';
import SplashScreen from './SplashScreen';
import SpotsListScreen from './Spots/SpotsListScreen';
import SpotDetailsScreen from './Spots/SpotDetailsScreen';

const dummyNavigator = {
  navigate: () => null,
};

const store = createStore(state => state, {
  user: {
    uuid: 1234,
    initialized: true,
  },
  spotFilters: {
    maxDistance: 2.0,
    sports: {},
  },
});

storiesOf('Screens', module)
  .add('SplashScreen', () => (
    <Provider store={store}>
      <SplashScreen user={{ initialized: true }} navigation={dummyNavigator} />
    </Provider>
  ))
  .add('LoginScreen', () => (
    <Provider store={store}>
      <LoginScreen navigation={dummyNavigator} />
    </Provider>
  ))
  .add('SpotsFilterScreen', () => (
    <Provider store={store}>
      <WithApolloMockProvider>
        <SpotsFilterScreen navigation={dummyNavigator} />
      </WithApolloMockProvider>
    </Provider>
  ))
  .add('InfoScreen', () => (
    <Provider store={store}>
      <InfoScreen />
    </Provider>
  ))
  .add('SpotsListScreen', () => (
    <Provider store={store}>
      <WithApolloMockProvider>
        <SpotsListScreen navigation={dummyNavigator} />
      </WithApolloMockProvider>
    </Provider>
  ))
  .add('SpotDetailsScreen', () => (
    <Provider store={store}>
      <WithApolloMockProvider>
        <SpotDetailsScreen
          navigation={{
            ...dummyNavigator,
            state: { params: { uuid: '12345' } },
          }}
        />
      </WithApolloMockProvider>
    </Provider>
  ));
