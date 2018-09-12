import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Colors from '../../../Themes/Colors';
import Block from '../Block';
import TextField from './index';

storiesOf('Common.TextField', module)
  .add('TextField', () => (
    <Block flex={1}>
      <TextField
        label="I'm the label"
        value="I'm the value"
      />
    </Block>
  ))
  .add('TextField with error', () => (
    <Block flex={1}>
      <TextField
        label="I'm the label"
        value="I'm the value"
        error="Some error msg"
      />
    </Block>
  ))
  .add('TextField with characterRestriction = 20', () => (
    <Block flex={1}>
      <TextField
        label="I'm the label"
        value="I'm the value"
        characterRestriction={20}
      />
    </Block>
  ))
  .add('TextField with white theme', () => (
    <Block bgColor={Colors.primaryGreen} flex={1}>
      <TextField
        theme="white"
        label="I'm the label"
        value="I'm the value"
        characterRestriction={20}
      />
    </Block>
  ))
  .add('TextField with white theme size L', () => (
    <Block bgColor={Colors.primaryGreen} flex={1}>
      <TextField
        theme="white"
        size="L"
        label="I'm the label"
        value="I'm the value"
        characterRestriction={20}
      />
    </Block>
  ));
