import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import Row from '../../Common/Row';
import navigation from './mocks';
import AdminMenu from '.';

storiesOf('Games.AdminMenu', module)
  .add('AdminMenu', () => (
    <View style={{ backgroundColor: 'gray', flex: 1 }}>
      <Row justifyContent="space-between">
        <View />
        <AdminMenu navigation={navigation} />
      </Row>
    </View>
  ));
