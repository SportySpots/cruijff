import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View, Text } from 'react-native';
import ClosableLayout from '.';

storiesOf('Layouts.ClosableLayout', module)
  .add('ClosableLayout black theme', () => (
    <ClosableLayout title="I'm the title">
      <View>
        <Text>I&apos;m the children</Text>
      </View>
    </ClosableLayout>
  ))
  .add('ClosableLayout white theme', () => (
    <ClosableLayout
      title="I'm the title"
      theme="white"
    >
      <View>
        <Text>I&apos;m the children</Text>
      </View>
    </ClosableLayout>
  ))
  .add('ClosableLayout white theme NOT closable', () => (
    <ClosableLayout
      title="I'm the title"
      theme="white"
      closable={false}
    >
      <View>
        <Text>I&apos;m the children</Text>
      </View>
    </ClosableLayout>
  ));
