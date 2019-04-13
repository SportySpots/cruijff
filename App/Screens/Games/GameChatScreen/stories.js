import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import GameChatScreen from '.';

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { uuid: '19405948' },
  },
};

storiesOf('Screens.Games', module)
  .add('GameChatScreen', () => (
    <View style={{ flex: 1 }}>
      <GameChatScreen navigation={dummyNavigator} />
    </View>
  ));
