import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Block from '../../Common/Block';
import Triangle from '.';

storiesOf('Common.Triangle', module)
  .add('Triangle top left', () => (
    <Block bgColor="link">
      <Triangle />
    </Block>
  ))
  .add('Triangle top right primary', () => (
    <Block>
      <Triangle
        position="top-right"
        primary
      />
    </Block>
  ));
