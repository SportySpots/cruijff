import { put } from 'redux-saga/effects'
import userActions from '../Redux/UserRedux'

export function * signup (api, action) {
  const result = yield api.signup({
    username: action.username,
    email: action.email,
    password: action.password
  })
  if (result.problem) {
    yield put(userActions.signupFailure(result.data))
  } else {
    yield put(userActions.signupSuccess(result.data))
    yield put(userActions.setToken(result.data.token))
  }
}
