import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import NavDots from '.';

storiesOf('Common.NavDots', module)
  .add('Default', () => (
    <View style={{ backgroundColor: 'black', height: 50 }}>
      <NavDots count={5} activeIndex={3} />
    </View>
  ));
