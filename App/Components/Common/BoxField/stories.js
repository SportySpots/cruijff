/* import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Colors from '../../../Themes/Colors';
import Block from '../Block';
import BoxField from '.';

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

storiesOf('Common.BoxField', module)
  .add('BoxField TextField comp', () => (
    <Block>
      <BoxField
        comp="TextField"
        label="I'm the label"
        value="I'm the value"
        error="I'm the error"
      />
    </Block>
  ))
  .add('BoxField Dropdown comp', () => (
    <Block>
      <BoxField
        comp="Dropdown"
        label="I'm the label"
        data={data}
        error="I'm the error"
      />
    </Block>
  ))
  .add('BoxField size S', () => (
    <Block>
      <BoxField
        comp="TextField"
        label="I'm the label"
        value="I'm the value"
        error="I'm the error"
        size="S"
      />
    </Block>
  ))
  .add('BoxField size ML', () => (
    <Block>
      <BoxField
        comp="TextField"
        label="I'm the label"
        value="I'm the value"
        error="I'm the error"
        size="ML"
      />
    </Block>
  ))
  .add('BoxField white theme', () => (
    <Block bgColor={Colors.primaryGreen}>
      <BoxField
        comp="TextField"
        label="I'm the label"
        value="I'm the value"
        error="I'm the error"
        theme="white"
      />
    </Block>
  ));
*/
