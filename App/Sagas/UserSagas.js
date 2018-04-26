import { call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import userActions from '../Redux/UserRedux'
import gql from 'graphql-tag'
import { client } from '../GraphQL'
import { AsyncStorage } from 'react-native'
import { Buffer } from 'buffer'

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

export function * setToken (api, action) {
  const claims = JSON.parse(
    Buffer.from(action.token.split('.')[1], 'base64').toString('ascii')
  )
  yield put(userActions.setClaims(claims))
  client.setToken(action.token)
  api.setToken(action.token)
  try {
    const result = yield call(client.query, {
      query: gql`
        {
          user(id: ${claims.user_id}) {
            uuid
          }
        }`
    })
    yield put(userActions.setUuid(result.data.user.uuid))
  } catch (e) {
    console.log(e)
  }
  AsyncStorage.setItem('TOKEN', action.token)
  yield put(userActions.setInitialized(true))
}
