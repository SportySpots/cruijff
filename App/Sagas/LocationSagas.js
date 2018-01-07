import { NavigationActions } from 'react-navigation';

import { call, put, takeEvery } from 'redux-saga/effects'
import { path } from 'ramda'
import Permissions from 'react-native-permissions'
import { LocationTypes } from '../Redux/LocationRedux'

function * getLocation (action) {
  yield put(NavigationActions.navigate({ routeName: 'FindSpotScreen' }))

  // Permissions.check('location').then(console.log).catch(console.log)
  // console.log(Permissions.request('location').then(console.log).catch(console.log))
  // console.log(navigator.geolocation.getCurrentPosition(console.log, console.log,
  //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }))
}

export function * locationSaga (action) {
  console.log(LocationTypes)
  yield takeEvery(LocationTypes.GET_LOCATION, getLocation)
}
