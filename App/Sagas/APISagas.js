import { put, takeEvery } from 'redux-saga/effects'
import Creators, { APITypes } from '../Redux/APIRedux'
import { log, LEVEL } from '../Services/Log'

export const APISaga = (api) => function * (action) {
  function * getSpots (action) {
    try {
      const result = yield api.getSpots()
      yield put(Creators.getSpotsSuccess(result.data))
    } catch (e) {
      log(LEVEL.ERROR, 'Error in getSpots', e)
      yield put(Creators.getSpotsFailed())
    }
  }

  yield takeEvery(APITypes.GET_SPOTS, getSpots)
}
