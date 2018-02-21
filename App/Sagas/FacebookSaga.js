import { put, fork, takeEvery, call, select } from 'redux-saga/effects'
import Creators, { FacebookTypes } from '../Redux/FacebookRedux'
import { log, LEVEL } from '../Services/Log'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { NavigationActions } from 'react-navigation'

export const facebookGetAccessToken = api =>
  function * (action) {
    try {
      const result = yield AccessToken.getCurrentAccessToken()
      yield put(Creators.facebookGetAccessTokenSuccess(result))
      const fbState = yield select(state => state.facebook.data.token)
      const profile = yield call(
        api.getProfile,
        fbState.accessToken,
        fbState.userID
      )
      yield put(Creators.facebookGetProfileSuccess(profile.data))
      yield put(NavigationActions.navigate({ routeName: 'DefaultNav' }))
    } catch (e) {
      log(LEVEL.ERROR, 'Error getting Facebook token', e)
      yield put(Creators.facebookLoginFail(e))
    }
  }

export const facebookLogin = api =>
  function * (action) {
    try {
      console.log(1)
      const result = yield LoginManager.logInWithReadPermissions([
        'public_profile'
      ])
      console.log(2)
      if (result.isCancelled) {
        log(LEVEL.INFO, 'facebook login Cancelled', result)
        yield put(Creators.facebookLoginFail(result))
      } else {
        log(LEVEL.INFO, 'facebook login OK', result.grantedPermissions)
        yield put(Creators.facebookLoginSuccess(result))
        yield fork(facebookGetAccessToken(api))
      }
    } catch (e) {
      log(LEVEL.ERROR, 'Error in facebook login', e)
      console.log(e)
      yield put(Creators.facebookLoginFail(e))
    }
  }

export const facebookSaga = api =>
  function * (action) {
    yield takeEvery(FacebookTypes.FACEBOOK_LOGIN, facebookLogin(api))
  }
