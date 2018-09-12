import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View, Text } from 'react-native';
import Divider from './index';

storiesOf('Common.Divider', module)
  .add('Divider', () => (
    <View>
      <Text>Above Divider</Text>
      <Divider />
      <Text>Below Divider</Text>
    </View>
  ));
