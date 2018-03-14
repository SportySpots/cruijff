import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  gameRequest: ['gameId'],
  gameSuccess: ['game'],
  gameFailure: null
})

export const GamesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  gameId: null,
  game: null,
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const GamesSelectors = {
  selectGame: state => state.game.game_id
}

/* ------------- Reducers ------------- */

// request the game details for a game
export const request = (state, { gameId }) =>
  state.merge({ fetching: true, gameId, game: null })

// successful game lookup
export const success = (state, action) => {
  const { game } = action
  return state.merge({ fetching: false, error: null, game })
}

// failed to get the game
export const failure = state =>
  state.merge({ fetching: false, error: true, game: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GAME_REQUEST]: request,
  [Types.GAME_SUCCESS]: success,
  [Types.GAME_FAILURE]: failure
})
