import { call, put } from 'redux-saga/effects'
import SpotsActions from '../Redux/SpotsRedux'

export function * getSpotDetails (api, action) {
  const { spot_id } = action
  // make the call to the api
  const response = yield call(api.getSpot, spot_id)

  if (response.ok) {
    console.log(response)
    const spot = response['data']

    // do data conversion here if needed
    yield put(SpotsActions.spotSuccess(spot))
  } else {
    yield put(SpotsActions.spotFailure())
  }
}

// export function * getAllSpots (api, action) {
//   // make the call to the api
//   const response = yield call(api.getAllSpots)
//
//   if (response.ok) {
//     const spots = response['data']
//
//     // do data conversion here if needed
//     yield put(SpotsActions.spotSuccess(spots))
//   } else {
//     yield put(SpotsActions.spotFailure())
//   }
// }
