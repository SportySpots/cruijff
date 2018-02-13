import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/SpotsRedux'

test('request', () => {
  const spotId = 449
  const state = reducer(INITIAL_STATE, Actions.spotRequest(spotId))

  expect(state.fetching).toBe(true)
  expect(state.spotId).toBe(spotId)
  expect(state.spot).toBeNull()
})

test('success', () => {
  const spot = {}
  const state = reducer(INITIAL_STATE, Actions.spotSuccess(spot))

  expect(state.fetching).toBe(false)
  expect(state.spot).toEqual(spot)
  expect(state.error).toBeNull()
})

test('failure', () => {
  const spot = {}
  const state = reducer(INITIAL_STATE, Actions.spotFailure(spot))

  expect(state.fetching).toBe(false)
  expect(state.spot).toBeNull()
  expect(state.error).toBe(true)
})
