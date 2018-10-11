import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Colors from '../../../Themes/Colors';
import Block from '../Block';
import BoxField from './index';

storiesOf('Common.BoxField', module)
  .add('BoxField size ML', () => (
    <Block>
      <BoxField
        label="I'm the label"
        value="I'm the value"
        size="ML"
      />
    </Block>
  ))
  .add('BoxField', () => (
    <Block>
      <BoxField
        label="I'm the label"
        value="I'm the value"
      />
    </Block>
  ))
  .add('BoxField size L', () => (
    <Block>
      <BoxField
        value="I'm the value"
        size="L"
      />
    </Block>
  ))
  .add('BoxField white theme', () => (
    <Block bgColor={Colors.primaryGreen}>
      <BoxField
        value="I'm the value"
        theme="white"
      />
    </Block>
  ));
