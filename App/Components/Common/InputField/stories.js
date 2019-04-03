import { storiesOf } from '@storybook/react-native';
import React from 'react';
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
    <InputField
      comp="TextField"
      label="I'm the label"
      value="I'm the value"
      prefix="prefix"
      suffix="suffix"
    />
  ))
  .add('InputField TextField comp with ERROR', () => (
    <InputField
      comp="TextField"
      label="I'm the label"
      value="I'm the value"
      error="I'm the error"
    />
  ))
  .add('InputField TextField comp DISABLED', () => (
    <InputField
      comp="TextField"
      label="I'm the label"
      value="I'm the value"
      disabled
    />
  ))
  .add('InputField TextField comp fullWidth', () => (
    <InputField
      comp="TextField"
      label="I'm the label"
      value="I'm the value"
      fullWidth
    />
  ))
  .add('InputField TextField comp fullWidth with ERROR', () => (
    <InputField
      comp="TextField"
      label="I'm the label"
      value="I'm the value"
      error="I'm the error"
      fullWidth
    />
  ))
  .add('InputField TextField comp fullWidth DISABLED', () => (
    <InputField
      comp="TextField"
      label="I'm the label"
      value="I'm the value"
      disabled
      fullWidth
    />
  ))
  .add('InputField Dropdown comp', () => (
    <InputField
      comp="Dropdown"
      label="I'm the label"
      data={data}
    />
  ))
  .add('InputField Dropdown comp with ERROR', () => (
    <InputField
      comp="Dropdown"
      label="I'm the label"
      data={data}
      error="I'm the error"
    />
  ))
  .add('InputField Dropdown comp DISABLED', () => (
    <InputField
      comp="Dropdown"
      label="I'm the label"
      data={data}
      disabled
    />
  ))
  .add('InputField Dropdown comp fullWidth', () => (
    <InputField
      comp="Dropdown"
      label="I'm the label"
      data={data}
      fullWidth
    />
  ))
  .add('InputField Dropdown comp fullWidth with ERROR', () => (
    <InputField
      comp="Dropdown"
      label="I'm the label"
      data={data}
      error="I'm the error"
      fullWidth
    />
  ))
  .add('InputField Dropdown comp fullWidth DISABLED', () => (
    <InputField
      comp="Dropdown"
      label="I'm the label"
      data={data}
      disabled
      fullWidth
    />
  ))
  .add('InputField size S', () => (
    <InputField
      comp="TextField"
      label="I'm the label"
      value="I'm the value"
      size="S"
    />
  ))
  .add('InputField size ML', () => (
    <InputField
      comp="TextField"
      label="I'm the label"
      value="I'm the value"
      size="ML"
    />
  ))
  .add('InputField white theme', () => (
    <Block bgColor="primaryGreen">
      <InputField
        comp="TextField"
        label="I'm the label"
        value="I'm the value"
        theme="white"
      />
    </Block>
  ))
  .add('InputField white theme with ERROR', () => (
    <Block bgColor="primaryGreen">
      <InputField
        comp="TextField"
        label="I'm the label"
        value="I'm the value"
        theme="white"
        error="I'm the error"
      />
    </Block>
  ));
