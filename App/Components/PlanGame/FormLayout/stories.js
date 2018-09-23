import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View, Text } from 'react-native';
import FormLayout from './index';

storiesOf('PlanGame.FormLayout', module)
  .add('FormLayout black theme', () => (
    <FormLayout title="I'm the title">
      <View>
        <Text>I&apos;m the children</Text>
      </View>
    </FormLayout>
  ))
  .add('FormLayout white theme', () => (
    <FormLayout
      title="I'm the title"
      theme="white"
    >
      <View>
        <Text>I&apos;m the children</Text>
      </View>
    </FormLayout>
  ));
