import { storiesOf } from '@storybook/react-native';
import React from 'react';
import InviteOnly from '.';

storiesOf('PlanGame.InviteOnly', module)
  .add('InviteOnly isPublic', () => (
    <InviteOnly isPublic />
  ))
  .add('InviteOnly isPrivate', () => (
    <InviteOnly isPublic={false} />
  ));
