import { fork } from 'redux-saga/effects';
import api from '../Services/SeedorfApi';

/* ------------- Sagas ------------- */
import { usersRootSaga } from './UserSagas';
import { locationSaga } from './LocationSagas';

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield fork(usersRootSaga, api);
  yield fork(locationSaga, api);
}
