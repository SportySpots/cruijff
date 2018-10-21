
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import NavBarButton from '.';

storiesOf('Common.NavBarButton', module)
  .add('NavBarButton', () => (
    <View style={{ flex: 1 }}>
      <NavBarButton
        icon={{ set: MaterialIcon, name: 'info' }}
        buttonText="test"
      />
    </View>
  ));
