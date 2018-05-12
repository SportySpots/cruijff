import { all, call, put, takeLatest } from 'redux-saga/effects';
import locationActions, { LocationTypes } from '../Redux/LocationRedux';
import { client } from '../GraphQL';
import { AsyncStorage } from 'react-native';
import Permissions from 'react-native-permissions';
import { reduxStore } from '../Redux';

export function* locationSaga(api) {
  yield takeLatest(LocationTypes.UPDATE_LOCATION, function* () {
    const permission = yield call(Permissions.check, 'location');
    if (permission === 'authorized') {
      navigator.geolocation.getCurrentPosition((result) => {
        // https://github.com/redux-saga/redux-saga/issues/79
        reduxStore.dispatch(locationActions.updateLocationFinished({
          lat: result.coords.latitude,
          lng: result.coords.longitude,
        }));
      }, console.warn);
    }
  });
  yield put(locationActions.updateLocation());
}
