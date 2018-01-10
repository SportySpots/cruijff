import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- LocationTypes and Action Creators ------------- */

const { Types, Creators } = createActions({
  getLocationPermission: null,
  getLocation: null,
  locationGranted: null,
  locationDenied: null,
  updateLocation: ['location']
})

export const LocationTypes = Types
export default Creators

/* ------------- Reducers ------------- */

export const STATUS = {
  PENDING: 'PENDING',
  DENIED: 'DENIED',
  GRANTED: 'GRANTED'
}

const INITIAL_STATE = Immutable({
  permission: STATUS.PENDING,
  data: {}
})

const locationStatus = (status) => (state = INITIAL_STATE, action) => {
  return state.merge({ permission: status })
}

const updateLocation = (state = INITIAL_STATE, action) => {
  return state.merge({ data: action.location })
}

const HANDLERS = {
  [Types.LOCATION_GRANTED]: locationStatus(STATUS.GRANTED),
  [Types.LOCATION_DENIED]: locationStatus(STATUS.DENIED),
  [Types.UPDATE_LOCATION]: updateLocation
}

export const reducer = createReducer(INITIAL_STATE, HANDLERS)
