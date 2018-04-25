import { AsyncStorage } from 'react-native'
import { Buffer } from 'buffer'
import { takeLatest, all, call } from 'redux-saga/effects'
import api from '../Services/SeedorfApi'
import { client } from '../App'
import gql from 'graphql-tag'

/* ------------- Types ------------- */

import { UserTypes } from '../Redux/UserRedux'

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
      console.log(claims)
      const result = yield call(client.query, {
        query: gql`{user(user_id:${claims.user_id}){uuid}}`
      })
      console.log(result)
      AsyncStorage.setItem('TOKEN', action.token)
      api.setToken(action.token)
    })
  ])
}
