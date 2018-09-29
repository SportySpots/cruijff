import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { store, navigation } from './mocks';
import GameDetailsScreen from '.';

storiesOf('Screens.Games', module)
  .add('GameDetailsScreen', () => (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <GameDetailsScreen navigation={navigation} />
      </Provider>
    </View>
  ));
