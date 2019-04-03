import { storiesOf } from '@storybook/react-native';
import React from 'react';
import ConfirmMagicTokenScreen from '.';

const navigation = {
  state: {
    params: {
      magicToken: null,
    },
  },
};

storiesOf('Screen.Auth', module)
  .add('ConfirmMagicTokenScreen', () => (
    <ConfirmMagicTokenScreen navigation={navigation} />
  ));
