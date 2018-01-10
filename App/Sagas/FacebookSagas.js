import { put, fork, takeEvery } from 'redux-saga/effects'
import Creators, { FacebookTypes } from '../Redux/FacebookRedux'
import { log, LEVEL } from '../Services/Log'
import { LoginManager, AccessToken } from 'react-native-fbsdk'

function * facebookGetAccessToken (action) {
  try {
    const result = yield AccessToken.getCurrentAccessToken()
    yield put(Creators.facebookGetAccessTokenSuccess(result))
  } catch (e) {
    log(LEVEL.ERROR, 'Error getting Facebook token', e)
    yield put(Creators.facebookLoginFail(e))
  }
}

function * facebookLogin (action) {
  try {
    const result = yield LoginManager.logInWithReadPermissions(['public_profile'])
    if (result.isCancelled) {
      log(LEVEL.INFO, 'facebook login Cancelled', result)
      yield put(Creators.facebookLoginFail(result))
    } else {
      log(LEVEL.INFO, 'facebook login OK', result.grantedPermissions)
      yield put(Creators.facebookLoginSuccess(result))
      yield fork(facebookGetAccessToken)
    }
  } catch (e) {
    log(LEVEL.ERROR, 'Error in facebook login', e)
    yield put(Creators.facebookLoginFail(e))
  }
}

export function * facebookSaga (action) {
  yield takeEvery(FacebookTypes.FACEBOOK_LOGIN, facebookLogin)
}
