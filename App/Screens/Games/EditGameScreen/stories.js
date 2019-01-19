import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import navigation from './mocks';
import EditGameScreen from '.';

storiesOf('Screens.Games', module)
  .add('EditGameScreen', () => (
    <View style={{ flex: 1 }}>
      <EditGameScreen
        navigation={navigation}
      />
    </View>
  ));
