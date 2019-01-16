import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Block from '../Block';
import NavigateLink from '.';

storiesOf('Common.NavigateLink', module)
  .add('NavigateLink', () => (
    <Block>
      <NavigateLink screen="MainNav" text="I'm the text" />
    </Block>
  ))
  .add('NavigateLink with icon', () => (
    <Block>
      <NavigateLink
        screen="MainNav"
        text="I'm the text"
        iconName="account-circle"
      />
    </Block>
  ));
