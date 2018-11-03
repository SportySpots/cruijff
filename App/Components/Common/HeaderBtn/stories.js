import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import Row from '../Row';
import HeaderBtn from '.';

storiesOf('Common.HeaderBtn', module)
  .add('HeaderBtn', () => (
    <View style={{ backgroundColor: 'gray', flex: 1 }}>
      <Row justifyContent="space-between">
        <View />
        <HeaderBtn iconName="filter-list" />
      </Row>
    </View>
  ));
