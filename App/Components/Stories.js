import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import Text from './Common/Text';

// TODO: move stories to individual component's folder
storiesOf('Text', module)
  .add('All sizes', () => (
    <View style={{ flex: 1, marginLeft: 20 }}>
      <Text>Default size</Text>
      <Text.S>Small size</Text.S>
      <Text.M>Medium size</Text.M>
      <Text.L>Large size</Text.L>
    </View>
  ))
  .add('Default text', () => <Text>Default size</Text>)
  .add('Small text', () => <Text.S>Small size</Text.S>)
  .add('Medium text', () => <Text.M>Medium size</Text.M>)
  .add('Large text', () => <Text.L>Large size</Text.L>);
