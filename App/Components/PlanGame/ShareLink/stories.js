import { storiesOf } from '@storybook/react-native';
import React from 'react';
import ShareLink from '.';

storiesOf('PlanGame.ShareLink', module)
  .add('ShareLink', () => (
    <ShareLink link="https://some/link" />
  ))
  .add('ShareLink long link', () => (
    <ShareLink link="https://some/link/some/link/some/link/some/link/some/link/some/link/some/link/some/link/some/link" />
  ));

