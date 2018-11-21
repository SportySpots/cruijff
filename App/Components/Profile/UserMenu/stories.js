import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import Row from '../../Common/Row';
import { navigation } from './mocks';
import UserMenu from '.';

storiesOf('Profile.UserMenu', module)
  .add('UserMenu', () => (
    <View style={{ backgroundColor: 'gray', flex: 1 }}>
      <Row justifyContent="space-between">
        <View />
        <UserMenu navigation={navigation} />
      </Row>
    </View>
  ));
