import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Game from './Game'
import GameListCard from './GameListCard'
import { View } from 'react-native'
import GamesList from './GameList'
import { WithApolloMockProvider } from '../../GraphQL'

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { id: 1 }
  }
}

storiesOf('Games')
  .add('Game details', () => (
    <WithApolloMockProvider>
      <Game navigation={dummyNavigator} />
    </WithApolloMockProvider>
  ))
  .add('Game list card', () => (
    <View style={{ marginHorizontal: 16 }}>
      <GameListCard id={1} />
    </View>
  ))
  .add('Games list', () => <GamesList navigation={dummyNavigator} />)
