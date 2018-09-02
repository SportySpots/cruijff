import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Mocks from '../../../../storybook/mocks';
import OrganizerAndDescription from './index';

const { organizer, description } = Mocks.game;

console.log('Mocks.game', Mocks.game);

storiesOf('Common.OrganizerAndDescription', module)
  .add('OrganizerAndDescription', () => (
    <OrganizerAndDescription
      organizer={organizer}
      description={description}
    />
  ));

