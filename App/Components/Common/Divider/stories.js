import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View, Text } from 'react-native';
import Row from '../Row';
import Divider from '.';

storiesOf('Common.Divider', module)
  .add('Divider', () => (
    <View>
      <Text>Above</Text>
      <Divider />
      <Text>Below</Text>
    </View>
  ))
  .add('Divider orientation row', () => (
    <Row>
      <Text>Left</Text>
      <Divider orientation="row" />
      <Text>Right</Text>
    </Row>
  ));
