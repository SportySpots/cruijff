import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View, Text } from 'react-native';
import DotSpacer from './index';

storiesOf('Common.DotSpacer', module)
  .add('DotSpacer', () => (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <Text>Left size</Text>
      <DotSpacer />
      <Text>Right size</Text>
    </View>
  ));
