import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  locationPermission: ['status']
})

export const LocationTypes = Types
export default Creators

/* ------------- Reducers ------------- */

export const STATUS = {
  PENDING: 'pending',
  AUTHORIZED: 'authorized',
  DENIED: 'denied'
}

const INITIAL_STATE = Immutable({
  status: STATUS.PENDING
})

const locationPermission = (state = INITIAL_STATE, action) =>
  state.merge({ status: action.status })

const HANDLERS = {
  [Types.LOCATION_PERMISSION]: locationPermission
}

export const reducer = createReducer(INITIAL_STATE, HANDLERS)
