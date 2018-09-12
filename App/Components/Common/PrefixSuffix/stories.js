import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';
import Colors from '../../../Themes/Colors';
import PrefixSuffix from './index';

storiesOf('Common.PrefixSuffix', module)
  .add('PrefixSuffix', () => (
    <PrefixSuffix
      prefix="I'm the prefix"
      suffix="I'm the suffix"
    >
      <Text>I&apos;m the child</Text>
    </PrefixSuffix>
  ))
  .add('PrefixSuffix prefix only', () => (
    <PrefixSuffix prefix="I'm the prefix">
      <Text>I&apos;m the child</Text>
    </PrefixSuffix>
  ))
  .add('PrefixSuffix suffix only', () => (
    <PrefixSuffix suffix="I'm the suffix">
      <Text>I&apos;m the child</Text>
    </PrefixSuffix>
  ))
  .add('PrefixSuffix red color size L', () => (
    <PrefixSuffix
      prefix="I'm the prefix"
      suffix="I'm the suffix"
      color={Colors.red}
      size="L"
    >
      <Text>I&apos;m the child</Text>
    </PrefixSuffix>
  ));
