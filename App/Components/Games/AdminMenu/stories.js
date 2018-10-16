import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import Row from '../../Common/Row';
import { navigation, store } from './mocks';
import AdminMenu from '.';

storiesOf('Games.AdminMenu', module)
  .add('AdminMenu', () => (
    <Provider store={store}>
      <View style={{ backgroundColor: 'gray', flex: 1 }}>
        <Row justifyContent="space-between">
          <View />
          <AdminMenu navigation={navigation} />
        </Row>
      </View>
    </Provider>
  ));