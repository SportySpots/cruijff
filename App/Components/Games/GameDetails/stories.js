import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ScrollView } from 'react-native';
import Mocks from '../../../../storybook/mocks';
import GameDetails from './index';

const user = {
  uuid: '123456',
};

storiesOf('Games.GameDetails', module)
  .add('GameDetails', () => (
    <ScrollView style={{ flex: 1 }}>
      <GameDetails
        user={user}
        game={Mocks.game}
        onSpotPress={() => {}}
        onAttendessPress={() => {}}
        rspvBeforeHook={() => {}}
        rspvSuccessHook={() => {}}
      />
    </ScrollView>
  ))
  .add('GameDetails cancelled', () => (
    <ScrollView style={{ flex: 1 }}>
      <GameDetails
        user={user}
        game={Object.assign({}, Mocks.game, { status: 'CANCELED' })}
        onSpotPress={() => {}}
        onAttendessPress={() => {}}
        rspvBeforeHook={() => {}}
        rspvSuccessHook={() => {}}
      />
    </ScrollView>
  ));
