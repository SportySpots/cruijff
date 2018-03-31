import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Game from './Game'

const games = require('../../../App/Fixtures/games.json')

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { game_id: 1 }
  }
}

storiesOf('Games').add('Single game', () => <Game id={1} />)
