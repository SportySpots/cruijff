import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import ShareGameForm from '.';

storiesOf('PlanGame.ShareGameForm', module)
  .add('ShareGameForm white theme', () => (
    <View style={{ flex: 1 }}>
      <ShareGameForm gameUUID="455" shareLink="http://some-link" />
    </View>
  ));
