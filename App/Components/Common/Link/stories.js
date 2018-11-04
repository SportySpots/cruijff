import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Block from '../Block';
import Link from '.';

storiesOf('Common.Link', module)
  .add('Link', () => (
    <Block>
      <Link text="I'm the text" href="I'm the href" />
    </Block>
  ))
  .add('Link with icon', () => (
    <Block>
      <Link
        text="I'm the text"
        href="I'm the href"
        iconName="account-circle"
      />
    </Block>
  ));
