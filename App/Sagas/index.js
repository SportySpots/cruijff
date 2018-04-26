import { AsyncStorage } from 'react-native'
import { takeLatest, all, put, call } from 'redux-saga/effects'
import api from '../Services/SeedorfApi'

/* ------------- Types ------------- */

import UserActions, { UserTypes } from '../Redux/UserRedux'

/* ------------- Sagas ------------- */

import { setToken, signup } from './UserSagas'
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(UserTypes.SIGNUP_REQUEST, signup, api),
    takeLatest(UserTypes.LOGOUT, function * () {
      yield call(AsyncStorage.removeItem, 'TOKEN')
    }),
    takeLatest(UserTypes.SET_TOKEN, setToken, api)
  ])

  const token = yield call(AsyncStorage.getItem, 'TOKEN')
  if (token) {
    yield put(UserActions.setToken(token))
  } else {
    yield put(UserActions.setInitialized(true))
  }
}
