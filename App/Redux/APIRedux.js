import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- LocationTypes and Action Creators ------------- */

const { Types, Creators } = createActions({
  getSpots: ['latitude', 'longitude', 'limit', 'skip', 'sort'],
  getSpotsSuccess: ['data'],
  getSpotsFailed: null
})

export const APITypes = Types
export default Creators

/* ------------- Reducers ------------- */

export const STATUS = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL'
}

const INITIAL_STATE = Immutable({
  spots: {
    status: STATUS.IDLE,
    data: {}
  }
})

const getSpots = (state = INITIAL_STATE, action) => {
  console.log('getspots', state)
  return state.setIn(['spots', 'status'], STATUS.PENDING)
}

const getSpotsSuccess = (state = INITIAL_STATE, action) => {
  return state.merge({ spots: { status: STATUS.SUCCESS, data: action.data } })
}

const getSpotsFailed = (state = INITIAL_STATE, action) => {
  console.log('getspots-failed', state)
  return state.setIn(['spots', 'status'], STATUS.FAIL)
}

const HANDLERS = {
  [Types.GET_SPOTS]: getSpots,
  [Types.GET_SPOTS_SUCCESS]: getSpotsSuccess,
  [Types.GET_SPOTS_FAILED]: getSpotsFailed
}

export const reducer = createReducer(INITIAL_STATE, HANDLERS)
