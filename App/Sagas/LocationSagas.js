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
  timeout: 5000,
  maximumAge: 10000
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
      log(LEVEL.INFO, 'Got location', location)
      yield put(Creators.updateLocation(location))
      yield delay(REFRESH_DELAY_MS)
      yield fork(getLocation)
    }
  } catch (e) {
    log(LEVEL.ERROR, 'Error in getLocation', e)
  }
}

function * getLocationPermission (action) {
  const result = yield Permissions.check('location')
  if (result === AUTHORIZED) {
    log(LEVEL.INFO, 'location permission: ' + result)
    yield put(Creators.locationGranted())
    yield fork(getLocation)
  } else {
    yield put(Creators.locationDenied())
    log(LEVEL.WARNING, 'location permission: ' + result)
  }
  yield put(NavigationActions.navigate({routeName: 'FindSpotScreen'}))
}

export function * locationSaga (action) {
  yield takeEvery(LocationTypes.GET_LOCATION_PERMISSION, getLocationPermission)
}
