import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View, Text } from 'react-native';
import OrDivider from '.';

storiesOf('Common.OrDivider', module)
  .add('OrDivider', () => (
    <View>
      <Text>Above</Text>
      <OrDivider />
      <Text>Below</Text>
    </View>
  ));
