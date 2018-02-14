import { find, propEq } from 'ramda'

export default {
  // Functions return fixtures
  getRoot: () => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  getRate: () => {
    return {
      ok: true,
      data: require('../Fixtures/rateLimit.json')
    }
  },
  getUser: username => {
    // This fixture only supports gantman or else returns skellock
    const gantmanData = require('../Fixtures/gantman.json')
    const skellockData = require('../Fixtures/skellock.json')
    return {
      ok: true,
      data: username.toLowerCase() === 'gantman' ? gantmanData : skellockData
    }
  },
  getAllSpots: () => {
    const spotsData = require('../Fixtures/spots.json')
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
    return {
      ok: true,
      data: spotsData.filter(spot => newWestSpots.includes(spot.id))
    }
  },
  getSpot: spotId => {
    const spotsData = require('../Fixtures/spots.json')
    const spot = find(propEq('id', spotId))(spotsData)
    return {
      ok: true,
      data: spot
    }
  }
}
