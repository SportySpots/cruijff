import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Mocks from '../../../../storybook/mocks';
import Organizer from './index';

const { organizer } = Mocks.game;

storiesOf('Organizer', module)
  .add('Organizer S textSize', () => (
    <Organizer
      organizer={organizer}
      textSize="S"
    />
  ))
  .add('Organizer default textSize (SM)', () => (
    <Organizer organizer={organizer} />
  ))
  .add('Organizer M textSize', () => (
    <Organizer
      organizer={organizer}
      textSize="M"
    />
  ));

