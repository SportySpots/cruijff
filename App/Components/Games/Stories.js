import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Game from './Game'
import GameListCard from './GameListCard'
import { View } from 'react-native'
import GamesList from './GameList'

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { id: 1 }
  }
}

storiesOf('Games')
  .add('Game details', () => <Game navigation={dummyNavigator} />)
  .add('Game list card', () => (
    <View style={{ marginHorizontal: 16 }}>
      <GameListCard id={1} />
    </View>
  ))
  .add('Games list', () => <GamesList navigation={dummyNavigator} />)
