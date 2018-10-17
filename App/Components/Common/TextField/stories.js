import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Colors from '../../../Themes/Colors';
import Block from '../Block';
import TextField from './index';

const containerStyle = { width: 200 };

storiesOf('Common.TextField', module)
  .add('TextField', () => (
    <Block>
      <TextField
        label="I'm the label"
        value=""
        containerStyle={containerStyle}
      />
    </Block>
  ))
  .add('TextField with error', () => (
    <Block>
      <TextField
        label="I'm the label"
        value="I'm the value"
        error="Some error msg"
        containerStyle={containerStyle}
      />
    </Block>
  ))
  .add('TextField with characterRestriction = 20', () => (
    <Block>
      <TextField
        label="I'm the label"
        value="I'm the value"
        characterRestriction={20}
        containerStyle={containerStyle}
      />
    </Block>
  ))
  .add('TextField with white theme', () => (
    <Block bgColor={Colors.primaryGreen}>
      <TextField
        theme="white"
        label="I'm the label"
        value="I'm the value"
        characterRestriction={20}
        containerStyle={containerStyle}
      />
    </Block>
  ))
  .add('TextField with white theme size L', () => (
    <Block bgColor={Colors.primaryGreen}>
      <TextField
        theme="white"
        size="L"
        label="I'm the label"
        value="I'm the value"
        characterRestriction={20}
        containerStyle={containerStyle}
      />
    </Block>
  ));
