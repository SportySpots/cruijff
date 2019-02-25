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
        prefix="prefix"
        suffix="suffix"
      />
    </Block>
  ))
  .add('InputField TextField comp with ERROR', () => (
    <Block>
      <InputField
        comp="TextField"
        label="I'm the label"
        value="I'm the value"
        error="I'm the error"
      />
    </Block>
  ))
  .add('InputField TextField comp DISABLED', () => (
    <Block>
      <InputField
        comp="TextField"
        label="I'm the label"
        value="I'm the value"
        disabled
      />
    </Block>
  ))
  .add('InputField TextField comp fullWidth', () => (
    <Block>
      <InputField
        comp="TextField"
        label="I'm the label"
        value="I'm the value"
        fullWidth
      />
    </Block>
  ))
  .add('InputField TextField comp fullWidth with ERROR', () => (
    <Block>
      <InputField
        comp="TextField"
        label="I'm the label"
        value="I'm the value"
        error="I'm the error"
        fullWidth
      />
    </Block>
  ))
  .add('InputField TextField comp fullWidth DISABLED', () => (
    <Block>
      <InputField
        comp="TextField"
        label="I'm the label"
        value="I'm the value"
        disabled
        fullWidth
      />
    </Block>
  ))
  .add('InputField Dropdown comp', () => (
    <Block>
      <InputField
        comp="Dropdown"
        label="I'm the label"
        data={data}
      />
    </Block>
  ))
  .add('InputField Dropdown comp with ERROR', () => (
    <Block>
      <InputField
        comp="Dropdown"
        label="I'm the label"
        data={data}
        error="I'm the error"
      />
    </Block>
  ))
  .add('InputField Dropdown comp DISABLED', () => (
    <Block>
      <InputField
        comp="Dropdown"
        label="I'm the label"
        data={data}
        disabled
      />
    </Block>
  ))
  .add('InputField Dropdown comp fullWidth', () => (
    <Block>
      <InputField
        comp="Dropdown"
        label="I'm the label"
        data={data}
        fullWidth
      />
    </Block>
  ))
  .add('InputField Dropdown comp fullWidth with ERROR', () => (
    <Block>
      <InputField
        comp="Dropdown"
        label="I'm the label"
        data={data}
        error="I'm the error"
        fullWidth
      />
    </Block>
  ))
  .add('InputField Dropdown comp fullWidth DISABLED', () => (
    <Block>
      <InputField
        comp="Dropdown"
        label="I'm the label"
        data={data}
        disabled
        fullWidth
      />
    </Block>
  ))
  .add('InputField size S', () => (
    <Block>
      <InputField
        comp="TextField"
        label="I'm the label"
        value="I'm the value"
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
        theme="white"
      />
    </Block>
  ));
