import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Mocks from '../../../../storybook/mocks';
import ClickableAttendees from './index';

storiesOf('Games.ClickableAttendees', module)
  .add('ClickableAttendees', () => (
    <ClickableAttendees game={Mocks.game} />
  ))
  .add('ClickableAttendees maxLength 2', () => (
    <ClickableAttendees
      game={Mocks.game}
      maxLength={2}
    />
  ));
