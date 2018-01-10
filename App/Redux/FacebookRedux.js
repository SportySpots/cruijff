import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  facebookLogin: null,
  facebookLoginFail: ['data'],
  facebookLoginSuccess: ['data'],
  facebookGetAccessTokenSuccess: ['token']
})

export const FacebookTypes = Types
export default Creators

/* ------------- Reducers ------------- */

export const STATUS = {
  PENDING: 'PENDING',
  FAIL: 'FAIL',
  SUCCESS: 'SUCCESS'
}

const INITIAL_STATE = Immutable({
  status: STATUS.PENDING,
  data: {}
})

const facebookFail = (state = INITIAL_STATE, action) =>
  state.merge({ status: STATUS.FAIL, data: action.data })

const facebookSuccess = (state = INITIAL_STATE, action) =>
  state.merge({ status: STATUS.SUCCESS, data: action.data })

const facebookAccessTokenSuccess = (state = INITIAL_STATE, action) =>
  state.setIn(['data', 'token'], action.token)

const HANDLERS = {
  [Types.FACEBOOK_LOGIN_FAIL]: facebookFail,
  [Types.FACEBOOK_LOGIN_SUCCESS]: facebookSuccess,
  [Types.FACEBOOK_GET_ACCESS_TOKEN_SUCCESS]: facebookAccessTokenSuccess
}

export const reducer = createReducer(INITIAL_STATE, HANDLERS)
