import { fork } from 'redux-saga/effects';
import api from '../Services/SeedorfApi';
import { locationSaga } from './LocationSagas';
/* ------------- Sagas ------------- */
import { usersRootSaga } from './UserSagas';


/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield fork(usersRootSaga, api);
  yield fork(locationSaga, api);
}
