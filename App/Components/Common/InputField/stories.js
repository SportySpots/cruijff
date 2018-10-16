import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Colors from '../../../Themes/Colors';
import Block from '../Block';
import InputField from './index';

storiesOf('Common.InputField', module)
  .add('InputField', () => (
    <Block>
      <InputField value="I'm the value" />
    </Block>
  ))
  .add('InputField size S', () => (
    <Block>
      <InputField
        value="I'm the value"
        size="S"
      />
    </Block>
  ))
  .add('InputField size L', () => (
    <Block>
      <InputField
        value="I'm the value"
        size="L"
      />
    </Block>
  ))
  .add('InputField white theme', () => (
    <Block bgColor={Colors.primaryGreen}>
      <InputField
        value="I'm the value"
        theme="white"
      />
    </Block>
  ));
