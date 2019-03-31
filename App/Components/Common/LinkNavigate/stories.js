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
  .add('LinkNavigate underline red', () => (
    <Block>
      <LinkNavigate
        navigation={navigation}
        to="MainNav"
        text="I'm the text"
        underline
        color="red"
      />
    </Block>
  ))
  .add('LinkNavigate with icon', () => (
    <Block>
      <LinkNavigate
        navigation={navigation}
        to="MainNav"
        text="I'm the text"
        iconSet="MaterialIcons"
        iconName="account-circle"
      />
    </Block>
  ));
