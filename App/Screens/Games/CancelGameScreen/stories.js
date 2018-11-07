import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import { store, navigation } from './mocks';
import CancelGameScreen from '.';

storiesOf('Screens.Games', module)
  .add('CancelGameScreen', () => (
    <View style={{ flex: 1 }}>
      <CancelGameScreen
        navigation={navigation}
      />
    </View>
  ));
