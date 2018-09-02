import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Mocks from '../../../../storybook/mocks';
import UserCircle from './index';

const { organizer } = Mocks.game;

storiesOf('Common.UserCircle', module)
  .add('UserCircle', () => (
    <UserCircle user={organizer} />
  ));

