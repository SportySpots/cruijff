import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Block from '../Block';
import LinkNavigate from '.';

storiesOf('Common.LinkNavigate', module)
  .add('LinkNavigate', () => (
    <Block>
      <LinkNavigate to="MainNav" text="I'm the text" />
    </Block>
  ))
  .add('LinkNavigate with icon', () => (
    <Block>
      <LinkNavigate
        to="MainNav"
        text="I'm the text"
        iconName="account-circle"
      />
    </Block>
  ));
