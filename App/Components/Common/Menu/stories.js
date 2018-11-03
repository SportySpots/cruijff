import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import Row from '../Row';
import Menu from '.';

const options = [
  {
    id: '1',
    text: 'first-option',
    onPress: () => { console.log('first option'); },
  },
  {
    id: '2',
    text: 'second-option',
    danger: true,
    onPress: () => { console.log('second option'); },
  },
];

storiesOf('Common.Menu', module)
  .add('Menu', () => (
    <View style={{ backgroundColor: 'gray', flex: 1 }}>
      <Row justifyContent="space-between">
        <View />
        <Menu
          menuName="menu-name"
          triggerName="trigger-name"
          options={options}
        />
      </Row>
    </View>
  ));
