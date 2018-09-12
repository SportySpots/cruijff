import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../../../Themes/Colors';
import FormLayout from './index';

storiesOf('PlanGame.FormLayout', module)
  .add('FormLayout', () => (
    <FormLayout title="I'm the title">
      <View>
        <Text>I&apos;m the children</Text>
      </View>
    </FormLayout>
  ))
  .add('FormLayout gray-black theme', () => (
    <FormLayout
      title="I'm the title"
      bgColor={Colors.lightGray}
      titleColor={Colors.black}
    >
      <View>
        <Text>I&apos;m the children</Text>
      </View>
    </FormLayout>
  ));
