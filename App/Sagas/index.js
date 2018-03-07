import { takeLatest, all, fork, put } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { SpotsTypes } from '../Redux/SpotsRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getSpotDetails } from './SpotsSagas'
import { facebookSaga } from './FacebookSaga'
import FacebookApi from '../Services/FacebookApi'
import { NavigationActions } from 'react-navigation'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
const facebookApi = FacebookApi.create()
/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    takeLatest(SpotsTypes.SPOT_REQUEST, getSpotDetails, api),
    fork(facebookSaga(facebookApi))
  ])
}
