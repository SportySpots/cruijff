import { all, call, put, takeLatest } from 'redux-saga/effects'
import userActions, { UserTypes } from '../Redux/UserRedux'
import gql from 'graphql-tag'
import { client } from '../GraphQL'
import { AsyncStorage } from 'react-native'
import { Buffer } from 'buffer'

export function * setToken (api, action) {
  const claims = JSON.parse(
    Buffer.from(action.token.split('.')[1], 'base64').toString('ascii')
  )
  try {
    client.setToken(action.token)
    const result = yield call(client.query, {
      query: gql`
        {
          currentuser {
            uuid
          }
        }
      `
    })
    yield put(userActions.setClaims(claims))
    yield put(userActions.setUuid(result.data.currentuser.uuid))
    yield call(AsyncStorage.setItem, 'TOKEN', action.token)
    api.setToken(action.token)
  } catch (e) {
    yield put(userActions.logout())
  }
  yield put(userActions.setInitialized(true))
}

export function * usersRootSaga (api) {
  yield all([
    takeLatest(UserTypes.LOGOUT, function * () {
      yield call(AsyncStorage.removeItem, 'TOKEN')
      client.setToken(null)
      api.setToken(null)
    }),
    takeLatest(UserTypes.SET_TOKEN, setToken, api)
  ])

  const token = yield call(AsyncStorage.getItem, 'TOKEN')
  if (token) {
    yield put(userActions.setToken(token))
  } else {
    yield put(userActions.setInitialized(true))
  }
}
