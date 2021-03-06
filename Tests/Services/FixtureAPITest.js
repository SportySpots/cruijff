import API from '../../App/Services/SeedorfApiLive'
import FixtureAPI from '../../App/Services/SeedorfApiFixture'
import R from 'ramda'

test('All fixtures map to actual API', () => {
  const fixtureKeys = R.keys(FixtureAPI).sort()
  const apiKeys = R.keys(API.create())

  const intersection = R.intersection(fixtureKeys, apiKeys).sort()

  // There is no difference between the intersection and all fixtures
  expect(R.equals(fixtureKeys, intersection)).toBe(true)
})

// test('FixtureAPI getRate returns the right file', () => {
//   const expectedFile = require('../../App/Fixtures/rateLimit.json')
//
//   expect(FixtureAPI.getRate()).toEqual({
//     ok: true,
//     data: expectedFile
//   })
// })
//
// test('FixtureAPI getUser returns the right file for gantman', () => {
//   const expectedFile = require('../../App/Fixtures/gantman.json')
//
//   expect(FixtureAPI.getUser('GantMan')).toEqual({
//     ok: true,
//     data: expectedFile
//   })
// })

// test('FixtureAPI getUser returns the right file for skellock as default', () => {
//   const expectedFile = require('../../App/Fixtures/skellock.json')
//
//   expect(FixtureAPI.getUser('Whatever')).toEqual({
//     ok: true,
//     data: expectedFile
//   })
// })

test('FixtureAPI getAllSpots returns the right file', () => {
  const expectedFile = require('../../App/Fixtures/spots.json')
  const newWestSpots = [
    289,
    288,
    287,
    286,
    512,
    300,
    311,
    291,
    292,
    294,
    295,
    298,
    75,
    77,
    74
  ]
  expect(FixtureAPI.getAllSpots()).toEqual({
    ok: true,
    data: expectedFile.filter(spot => newWestSpots.includes(spot.id))
  })
})

test('FixtureAPI getSpot returns the spot', () => {
  expect(FixtureAPI.getSpot(449)['data']['id']).toEqual(449)
})
