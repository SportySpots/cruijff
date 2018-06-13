import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    setSports: ['selectedSportIds'],
    setMaxDistance: ['maxDistance'],
  },
  { prefix: 'SPOTFILTER_' },
);

export const SpotFilterTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

// Hack: we should actually query sports and then get their ids
const nSports = 9;
const allSportIds = [];

for (let i = 1; i <= nSports; i += 1) {
  allSportIds.push(i.toString());
}

export const INITIAL_STATE = Immutable({
  maxDistance: 2.0,
  selectedSportIds: allSportIds,
});

/* ------------- Reducers ------------- */

export const setSports = (state, { selectedSportIds }) => state.merge({ selectedSportIds });
export const setMaxDistance = (state, { maxDistance }) => state.merge({ maxDistance });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_SPORTS]: setSports,
  [Types.SET_MAX_DISTANCE]: setMaxDistance,
});
