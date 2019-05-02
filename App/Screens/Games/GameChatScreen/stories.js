import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import navigation from './mocks';
import GameChatScreen from '.';

storiesOf('Screens.Games', module)
  .add('GameChatScreen', () => (
    <View style={{ flex: 1 }}>
      <GameChatScreen navigation={navigation} />
    </View>
  ));
