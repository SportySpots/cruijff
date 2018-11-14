import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View, Text } from 'react-native';
import { TopLayout, BottomLayout } from '.';

storiesOf('Layouts.TopBottomLayout', module)
  .add('TopBottomLayout black theme', () => [
    <TopLayout key="top">
      <View>
        <Text>I&apos;m in the top layout</Text>
      </View>
    </TopLayout>,
    <BottomLayout key="bottom">
      <View>
        <Text>I&apos;m in the bottom layout</Text>
      </View>
    </BottomLayout>,
  ]);
