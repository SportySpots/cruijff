import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Text from '.';

storiesOf('common.Text', module)
  .add('Text S size', () => (
    <Text size="S">
      I&apos;m the Text
    </Text>
  ))
  .add('Text default SM size', () => (
    <Text>
      I&apos;m the Text
    </Text>
  ))
  .add('Text default SM size underline', () => (
    <Text underline>
      I&apos;m the Text
    </Text>
  ))
  .add('Text default SM size bold', () => (
    <Text bold>
      I&apos;m the Text
    </Text>
  ))
  .add('Text M size', () => (
    <Text size="M">
      I&apos;m the Text
    </Text>
  ))
  .add('Text ML size', () => (
    <Text size="ML">
      I&apos;m the Text
    </Text>
  ))
  .add('Text L size', () => (
    <Text size="L">
      I&apos;m the Text
    </Text>
  ))
  .add('Text XL size', () => (
    <Text size="XL">
      I&apos;m the Text
    </Text>
  ))
  .add('Text XL size error color', () => (
    <Text size="XL" color="error">
      I&apos;m the Text
    </Text>
  ))
  .add('Text XL bold', () => (
    <Text size="XL" bold>
      I&apos;m the Text
    </Text>
  ))
  // .add('Text XL regular semibold', () => (
  //   <Text size="XL" regular semibold>
  //     I&apos;m the Text
  //   </Text>
  // ))
  .add('Text numberOfLines={1}', () => (
    <Text numberOfLines={1}>
      Some long long really long text Some long long really long text
      Some long long really long text
    </Text>
  ));
