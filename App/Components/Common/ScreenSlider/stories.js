import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import ScreenSlider from '.';

const data = [1, 2, 3];
const colors = ['#f00', '#f00', '#0f0', '#00f'];

storiesOf('Screenslider', module)
  .add('ScreenSlider', () => (
    <ScreenSlider
      data={data}
      style={{ flex: 1 }}
      renderItem={({ item }) => (
        <View
          style={{
            flex: 1,
            backgroundColor: colors[item],
          }}
        />
      )}
    />
  ));
