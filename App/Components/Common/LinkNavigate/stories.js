import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Block from '../Block';
import navigation from './utils';
import LinkNavigate from '.';

storiesOf('Common.LinkNavigate', module)
  .add('LinkNavigate', () => (
    <Block>
      <LinkNavigate
        navigation={navigation}
        to="MainNav"
        text="I'm the text"
      />
    </Block>
  ))
  .add('LinkNavigate with icon', () => (
    <Block>
      <LinkNavigate
        navigation={navigation}
        to="MainNav"
        text="I'm the text"
        iconName="account-circle"
      />
    </Block>
  ));
