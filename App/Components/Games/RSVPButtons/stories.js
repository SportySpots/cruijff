import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import RSVPButtons from '.';

storiesOf('Games.RSVPButtons', module)
  .add('RSVPButtons', () => (

    <View style={{ flex: 1 }}>
      <RSVPButtons />
    </View>

  ));
