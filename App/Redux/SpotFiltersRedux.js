import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    toggleSport: ['uuid'],
    setMaxDistance: ['distance'],
  },
  { prefix: 'SPOTFILTER_' },
);

export const SpotFilterTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  maxDistance: 2.0,
  sports: {},
});

/* ------------- Reducers ------------- */
export const toggleSport = (state, action) => {
  const oldValue = state.sports[action.uuid];
  const newValue = typeof oldValue === 'undefined' ? false : !oldValue;
  return state.set('sports', state.sports.merge({ [action.uuid]: newValue }));
};

export const setMaxDistance = (state, action) => state.merge({ maxDistance: action.distance });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TOGGLE_SPORT]: toggleSport,
  [Types.SET_MAX_DISTANCE]: setMaxDistance,
});
