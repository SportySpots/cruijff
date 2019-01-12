import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Block from '../Block';
import Logo from '.';

storiesOf('Common.Logo', module)
  .add('Logo', () => (
    <Block>
      <Logo />
    </Block>
  ));
