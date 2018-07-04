import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILURE: 'failure',
};

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    setUuid: ['uuid'],
    setClaims: ['claims'],
    setToken: ['token'],
    setInitialized: ['initialized'],
    logout: null,
  },
  { prefix: 'USER_' },
);

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  uuid: null,
  claims: {},
  token: null,
  initialized: false,
});

/* ------------- Reducers ------------- */

export const logout = state => INITIAL_STATE.merge({ initialized: true });

export const setToken = (state, action) => state.merge({ token: action.token });
export const setUUID = (state, action) => state.merge({ uuid: action.uuid });
export const setClaims = (state, action) => state.merge({ claims: action.claims });
export const setInitialized = (state, action) => state.merge({ initialized: action.initialized });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGOUT]: logout,
  [Types.SET_TOKEN]: setToken,
  [Types.SET_UUID]: setUUID,
  [Types.SET_CLAIMS]: setClaims,
  [Types.SET_INITIALIZED]: setInitialized,
});
