import { AsyncStorage } from 'react-native'

import { takeLatest, all, fork, put } from 'redux-saga/effects'
import api from '../Services/SeedorfApi'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { SpotsTypes } from '../Redux/SpotsRedux'
import { UserTypes } from '../Redux/UserRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getSpotDetails } from './SpotsSagas'
import { signup } from './UserSagas'
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    takeLatest(SpotsTypes.SPOT_REQUEST, getSpotDetails, api),

    takeLatest(UserTypes.SIGNUP_REQUEST, signup, api),

    takeLatest(UserTypes.SET_TOKEN, function * (action) {
      AsyncStorage.setItem('TOKEN', action.token)
      api.setToken(action.token)
    })
  ])
}
