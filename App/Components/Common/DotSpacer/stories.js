import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';
import DotSpacer from '.';
import Row from '../Row';

storiesOf('Common.DotSpacer', module)
  .add('DotSpacer size S', () => (
    <Row>
      <Text>Left size</Text>
      <DotSpacer size="S" />
      <Text>Right size</Text>
    </Row>
  ))
  .add('DotSpacer default size M', () => (
    <Row>
      <Text>Left size</Text>
      <DotSpacer />
      <Text>Right size</Text>
    </Row>
  ))
  .add('DotSpacer size L', () => (
    <Row>
      <Text>Left size</Text>
      <DotSpacer size="L" />
      <Text>Right size</Text>
    </Row>
  ));
