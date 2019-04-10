import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Block from '../Block';
import TextField from '.';

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
  .add('TextField disabled', () => (
    <Block>
      <TextField
        label="I'm the label"
        value="I'm the value"
        disabled
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
  .add('TextField with WHITE theme', () => (
    <Block bgColor="primaryGreen">
      <TextField
        theme="white"
        label="I'm the label"
        value="I'm the value"
        characterRestriction={20}
        containerStyle={containerStyle}
      />
    </Block>
  ))
  .add('TextField with WHITE theme with ERROR', () => (
    <Block bgColor="primaryGreen">
      <TextField
        theme="white"
        label="I'm the label"
        value="I'm the value"
        error="I'm the error"
        characterRestriction={20}
        containerStyle={containerStyle}
      />
    </Block>
  ))
  .add('TextField with MIX theme', () => (
    <Block bgColor="primaryGreen">
      <TextField
        theme="mix"
        label="I'm the label"
        value="I'm the value"
        characterRestriction={20}
        containerStyle={containerStyle}
      />
    </Block>
  ))
  .add('TextField with white theme size ML', () => (
    <Block bgColor="primaryGreen">
      <TextField
        theme="white"
        size="ML"
        label="I'm the label"
        value="I'm the value"
        characterRestriction={20}
        containerStyle={containerStyle}
      />
    </Block>
  ));
