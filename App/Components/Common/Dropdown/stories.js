import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Colors from '../../../Themes/Colors';
import Block from '../Block';
import Dropdown from './index';

const data = [{
  value: 'Banana',
}, {
  value: 'Mango',
}, {
  value: 'Pear',
}];

storiesOf('Common.Dropdown', module)
  .add('Dropdown', () => (
    <Block>
      <Dropdown
        label="I'm the label"
        data={data}
        // value="I'm the value"
      />
    </Block>
  ))
  .add('Dropdown with error', () => (
    <Block>
      <Dropdown
        label="I'm the label"
        data={data}
        // value="I'm the value"
        error="Some error msg"
      />
    </Block>
  ))
  .add('Dropdown with white theme', () => (
    <Block bgColor={Colors.primaryGreen}>
      <Dropdown
        theme="white"
        label="I'm the label"
        data={data}
        // value="I'm the value"
        // characterRestriction={20}
      />
    </Block>
  ))
  .add('Dropdown with white theme size L', () => (
    <Block bgColor={Colors.primaryGreen}>
      <Dropdown
        theme="white"
        size="L"
        label="I'm the label"
        data={data}
        // value="I'm the value"
        // characterRestriction={20}
      />
    </Block>
  ));
