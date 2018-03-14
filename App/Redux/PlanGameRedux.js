import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setGameDetailField: ['field', 'value'],
  clearGame: null
})

export const PlanGameTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  gameDetails: {
    sport: null,
    date: null,
    startTime: null,
    stopTime: null,
    spotId: null,
    description: null,
    isPublic: true
  }
})

/* ------------- Selectors ------------- */

export const PlanGameSelectors = {
  gameDetails: state => state.gameDetails
}

/* ------------- Reducers ------------- */

export const setGameDetailField = (state, action) => {
  const { field, value } = action
  return state.setIn(['gameDetails', field], value)
}

export const clear = state => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_GAME_DETAIL_FIELD]: setGameDetailField,
  [Types.CLEAR_GAME]: clear
})
