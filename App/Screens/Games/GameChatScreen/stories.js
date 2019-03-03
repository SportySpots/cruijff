import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import GameChatScreen from '.';

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { uuid: 'cdfa268a-e809-43be-a659-bd2310737baa' },
  },
};

storiesOf('Screens.Games', module)
  .add('GameChatScreen', () => (
    <View style={{ flex: 1 }}>
      <GameChatScreen navigation={dummyNavigator} />
    </View>
  ));
