import React from 'react';
import { storiesOf } from '@storybook/react-native';

// import LoginScreen from './Auth/LoginScreen';
// import SpotsFilterScreen from './Spots/SpotsFilterScreen';
// import InfoScreen from './InfoScreen';
import SplashScreen from './SplashScreen';
// import SpotsListScreen from './Spots/SpotsListScreen';

const dummyNavigator = {
  navigate: () => null,
};

storiesOf('Screens', module)
  .add('SplashScreen', () => (
    <SplashScreen user={{ initialized: true }} navigation={dummyNavigator} />
  ));
  /* .add('LoginScreen', () => (
    <Provider store={store}>
      <LoginScreen navigation={dummyNavigator} />
    </Provider>
  )) */
  /* .add('SpotsFilterScreen', () => (
    <Provider store={store}>
      <SpotsFilterScreen navigation={dummyNavigator} />
    </Provider>
  )) */
  /* .add('InfoScreen', () => (
    <Provider store={store}>
      <InfoScreen />
    </Provider>
  )) */
  /* .add('SpotsListScreen', () => (
    <Provider store={store}>
      <SpotsListScreen navigation={dummyNavigator} />
    </Provider>
  )); */
