import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Game from './Game'
import GameListCard from './GameListCard'
import { View } from 'react-native'

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { game_id: 1 }
  }
}

storiesOf('Games')
  .add('Game details', () => <Game id={1} />)
  .add('Game list card', () => (
    <View style={{ marginHorizontal: 16 }}>
      <GameListCard id={1} />
    </View>
  ))
