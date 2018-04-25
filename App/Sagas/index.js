import { AsyncStorage } from 'react-native'
import { Buffer } from 'buffer'
import { takeLatest, all, put, call } from 'redux-saga/effects'
import api from '../Services/SeedorfApi'
import { client } from '../GraphQL'
import gql from 'graphql-tag'

/* ------------- Types ------------- */

import UserActions, { UserTypes } from '../Redux/UserRedux'

/* ------------- Sagas ------------- */

import { signup } from './UserSagas'
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  console.log('root saga started')

  yield all([
    takeLatest(UserTypes.SIGNUP_REQUEST, signup, api),
    takeLatest(UserTypes.SET_TOKEN, function * (action) {
      const claims = JSON.parse(
        Buffer.from(action.token.split('.')[1], 'base64').toString('ascii')
      )
      client.setToken(action.token)
      api.setToken(action.token)
      console.log(claims)
      try {
        const result = yield call(client.query, {
          query: gql`
            {
              user(id: ${claims.user_id}) {
                uuid
              }
            }`
        })
        console.log('r', result)
      } catch (e) {
        console.log(e)
      }
      AsyncStorage.setItem('TOKEN', action.token)
    })
  ])

  const token = yield call(AsyncStorage.getItem, 'TOKEN')
  console.log(UserActions)
  yield put(UserActions.setToken(token))
}
