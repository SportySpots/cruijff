import React from 'react';
import { storiesOf } from '@storybook/react-native';
import NotificationsListScreen from '.';

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { uuid: 1 },
  },
};

storiesOf('Screens.Notifications', module)
  .add('NotificationsListScreen', () => (
    <NotificationsListScreen navigation={dummyNavigator} />
  ));
