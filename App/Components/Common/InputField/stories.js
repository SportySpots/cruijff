import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Colors from '../../../Themes/Colors';
import Block from '../Block';
import InputField from '.';

const data = [
  {
    label: 'Banana', value: 'banana',
  },
  {
    label: 'Mango', value: 'mango',
  },
  {
    label: 'Pear', value: 'pear',
  },
];

storiesOf('Common.InputField', module)
  .add('InputField TextField comp', () => (
    <Block>
      <InputField
        comp="TextField"
        label="I'm the label"
        value="I'm the value"
        error="I'm the error"
      />
    </Block>
  ))
  .add('InputField TextField comp boxed', () => (
    <Block>
      <InputField
        comp="TextField"
        label="I'm the label"
        value="I'm the value"
        error="I'm the error"
        boxed
      />
    </Block>
  ))
  .add('InputField Dropdown comp', () => (
    <Block>
      <InputField
        comp="Dropdown"
        label="I'm the label"
        data={data}
        error="I'm the error"
      />
    </Block>
  ))
  .add('InputField Dropdown comp boxed', () => (
    <Block>
      <InputField
        comp="Dropdown"
        label="I'm the label"
        data={data}
        error="I'm the error"
        boxed
      />
    </Block>
  ))
  .add('InputField size S', () => (
    <Block>
      <InputField
        comp="TextField"
        label="I'm the label"
        value="I'm the value"
        error="I'm the error"
        size="S"
      />
    </Block>
  ))
  .add('InputField size ML', () => (
    <Block>
      <InputField
        comp="TextField"
        label="I'm the label"
        value="I'm the value"
        error="I'm the error"
        size="ML"
      />
    </Block>
  ))
  .add('InputField white theme', () => (
    <Block bgColor={Colors.primaryGreen}>
      <InputField
        comp="TextField"
        label="I'm the label"
        value="I'm the value"
        error="I'm the error"
        theme="white"
      />
    </Block>
  ));
