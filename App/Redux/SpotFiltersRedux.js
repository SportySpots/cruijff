import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    setSportFilter: ['filterBySports'],
    setSports: ['selectedSportIds'],
    setMaxDistance: ['maxDistance'],
  },
  { prefix: 'SPOTFILTER_' },
);

export const SpotFilterTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  maxDistance: 2.0,
  filterBySports: false,
  selectedSportIds: [],
});

/* ------------- Reducers ------------- */

export const setMaxDistance = (state, { maxDistance }) => state.merge({ maxDistance });
export const setSportFilter = (state, { filterBySports }) => state.merge({ filterBySports });
export const setSports = (state, { selectedSportIds }) => state.merge({ selectedSportIds });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_MAX_DISTANCE]: setMaxDistance,
  [Types.SET_SPORT_FILTER]: setSportFilter,
  [Types.SET_SPORTS]: setSports,
});
