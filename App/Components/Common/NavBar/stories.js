import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import navigation from './mocks';
import NavBar from '.';

storiesOf('Common.NavBar', module)
  .add('NavBar', () => (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }} />
      <NavBar navigation={navigation} />
    </View>
  ));
