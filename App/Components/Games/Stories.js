import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Game from './Game'
import GameListCard from './GameListCard'
import { View } from 'react-native'
import GamesList, { GET_GAMES_LIST } from './GameList'
import { WithApolloMockProvider } from '../../GraphQL'
import { Query } from 'react-apollo'
import PlayerList from './PlayerList'

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { uuid: 1 }
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
      <WithApolloMockProvider>
        <Query query={GET_GAMES_LIST}>
          {({ loading, error, data }) =>
            loading || error ? null : (
              <GameListCard game={data.games[0]} navigation={dummyNavigator} />
            )
          }
        </Query>
      </WithApolloMockProvider>
    </View>
  ))
  .add('Games list', () => (
    <WithApolloMockProvider>
      <GamesList navigation={dummyNavigator} />
    </WithApolloMockProvider>
  ))
  .add('Player list', () => (
    <WithApolloMockProvider>
      <PlayerList uuid='asdasd' />
    </WithApolloMockProvider>
  ))
