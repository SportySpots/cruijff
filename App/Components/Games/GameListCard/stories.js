import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import Mocks from '../../../../storybook/mocks';
import GameListCard from './index';

storiesOf('Games.GameListCard', module)
  .add('GameListCard', () => (
    <View>
      <GameListCard game={Mocks.game} />
    </View>
  ))
  .add('GameListCard CANCELED', () => (
    <View>
      <GameListCard
        game={Object.assign({}, Mocks.game, { status: 'CANCELED' })}
      />
    </View>
  ))
  .add('GameListCard short title/name', () => (
    <View>
      <GameListCard
        game={Object.assign({}, Mocks.game, { name: 'Some Short Name' })}
      />
    </View>
  ))
  .add('GameListCard CANCELED short title/name', () => (
    <View>
      <GameListCard
        game={Object.assign(
          {},
          Mocks.game,
          { status: 'CANCELED', name: 'Some Short Name' })}
      />
    </View>
  ));
