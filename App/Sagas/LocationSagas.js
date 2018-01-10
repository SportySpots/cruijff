import { NavigationActions } from 'react-navigation'
import { delay } from 'redux-saga'
import { put, fork, takeEvery } from 'redux-saga/effects'
import Permissions from 'react-native-permissions'
import Creators, { LocationTypes } from '../Redux/LocationRedux'
import { log, LEVEL } from '../Services/Log'

const AUTHORIZED = 'authorized'
// const REJECTED = 'rejected'

const REFRESH_DELAY_MS = 60000 // refresh every minute

const LOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 30000
}

function getLocationPromise () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, LOCATION_OPTIONS)
  })
}

function * getLocation (action) {
  try {
    const result = yield Permissions.check('location')
    if (result !== AUTHORIZED) {
      yield put(Creators.locationDenied())
      log(LEVEL.ERROR, 'Trying to get location without permission')
    } else {
      const location = yield getLocationPromise()
      yield put(Creators.updateLocation(location))
      yield delay(REFRESH_DELAY_MS)
      yield fork(getLocation)
    }
  } catch (e) {
    log(LEVEL.ERROR, 'Error in getLocation', e)
  }
}

function * getLocationPermission (action) {
  log(LEVEL.INFO, 'permission get started')
  const result = yield Permissions.request('location')
  if (result === AUTHORIZED) {
    yield put(Creators.locationGranted())
    yield fork(getLocation)
    yield put(NavigationActions.navigate({routeName: 'FindSpotScreen'}))
  } else {
    yield put(Creators.locationDenied())
  }
}

const rejectAfter = (time) =>
  new Promise((resolve, reject) => setTimeout(reject, time))

export function * checkLocationPermission (action) {
  /* Due to some bug in `Permissions`, the .check('location') doesn't resolve (or reject) if permission is not allowed
     This is a workaround.
   */
  const result = yield Promise.race([Permissions.check('location'), rejectAfter(200)]).catch(console.log)
  if (result === AUTHORIZED) {
    yield put(Creators.locationGranted())
    yield fork(getLocation)
    yield put(NavigationActions.navigate({routeName: 'FindSpotScreen'}))
  } else {
    yield put(NavigationActions.navigate({routeName: 'AskLocation'}))
  }
}

export function * locationSaga (action) {
  yield takeEvery(LocationTypes.CHECK_LOCATION_PERMISSION, checkLocationPermission)
  yield takeEvery(LocationTypes.GET_LOCATION_PERMISSION, getLocationPermission)
}
