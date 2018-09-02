import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';
import DotSpacer from './index';
import { HorizontalView } from '../../Games/style';

storiesOf('Common.DotSpacer', module)
  .add('DotSpacer size S', () => (
    <HorizontalView>
      <Text>Left size</Text>
      <DotSpacer size="S" />
      <Text>Right size</Text>
    </HorizontalView>
  ))
  .add('DotSpacer default size M', () => (
    <HorizontalView>
      <Text>Left size</Text>
      <DotSpacer />
      <Text>Right size</Text>
    </HorizontalView>
  ))
  .add('DotSpacer size L', () => (
    <HorizontalView>
      <Text>Left size</Text>
      <DotSpacer size="L" />
      <Text>Right size</Text>
    </HorizontalView>
  ));
