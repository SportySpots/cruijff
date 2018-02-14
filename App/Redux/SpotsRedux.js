import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  spotRequest: ['spotId'],
  spotSuccess: ['spot'],
  spotFailure: null
})

export const SpotsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  spotId: null,
  spot: null,
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const SpotsSelectors = {
  selectSpot: state => state.spot.spot_id
}

/* ------------- Reducers ------------- */

// request the spot details for a spot
export const request = (state, { spotId }) =>
  state.merge({ fetching: true, spotId, spot: null })

// successful spot lookup
export const success = (state, action) => {
  const { spot } = action
  return state.merge({ fetching: false, error: null, spot })
}

// failed to get the spot
export const failure = state =>
  state.merge({ fetching: false, error: true, spot: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SPOT_REQUEST]: request,
  [Types.SPOT_SUCCESS]: success,
  [Types.SPOT_FAILURE]: failure
})
