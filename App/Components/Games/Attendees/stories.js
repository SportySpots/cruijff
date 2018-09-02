import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Mocks from '../../../../storybook/mocks';
import Attendees from './index';

storiesOf('Games.Attendees', module)
  .add('Attendees', () => (
    <Attendees game={Mocks.game} />
  ))
  .add('Attendees maxLength 2', () => (
    <Attendees
      game={Mocks.game}
      maxLength={2}
    />
  ));
