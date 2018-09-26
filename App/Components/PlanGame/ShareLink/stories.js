import { storiesOf } from '@storybook/react-native';
import React from 'react';
import ShareLink from './index';

storiesOf('PanGame.ShareLink', module)
  .add('ShareLink', () => (
    <ShareLink link="https://some/link" />
  ));

