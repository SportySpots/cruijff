import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import navigation from './mocks';
import GameDetailsScreen from '.';

storiesOf('Screens.Games', module)
  .add('GameDetailsScreen', () => (
    <View style={{ flex: 1 }}>
      <GameDetailsScreen navigation={navigation} />
    </View>
  ));
