import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateLocation: null,
  updateLocationFinished: ['location'],
});

export const LocationTypes = Types;
export default Creators;

/* ------------- Reducers ------------- */

const INITIAL_STATE = Immutable({
  lat: 4,
  lng: 6,
});

const updateLocationFinished = (state = INITIAL_STATE, action) =>
  console.log(action) || state.merge(action.location);

const HANDLERS = {
  [Types.UPDATE_LOCATION_FINISHED]: updateLocationFinished,
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);
