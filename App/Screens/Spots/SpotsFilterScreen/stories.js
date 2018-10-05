import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import navigation from './mocks';
import SpotsFilterScreen from '.';

storiesOf('Screens.Spots', module)
  .add('SpotsFilterScreen', () => (
    <View style={{ flex: 1 }}>
      <SpotsFilterScreen navigation={navigation} />
    </View>
  ));

