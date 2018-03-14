import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  login: null,
  logout: null
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  firstName: 'Tom',
  lastName: 'Klaver',
  age: 31,
  level: 50,
  initials: 'TK'
})

/* ------------- Selectors ------------- */

export const userSelector = {
  user: state => state.user
}

/* ------------- Reducers ------------- */

export const login = state => INITIAL_STATE
export const logout = state => ({})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN]: login,
  [Types.LOGOUT]: logout
})
