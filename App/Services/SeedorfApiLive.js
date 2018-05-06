// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import config from '../config'
import moment from 'moment'

// our "constructor"
const create = () => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    baseURL: config.seedorfRestUrl,
    headers: {
      'Cache-Control': 'no-cache',
      Cookie: ''
    },
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getUser = username => api.get('search/users/', { q: username })
  const getAllSpots = () => null
  const getSpot = spotId => spotId
  const getGame = gameId => gameId
  const getGames = ({ month }) => api.get('search/games/', { q: month })
  const verifyToken = token => api.post('/auth/token-verify/', { token: token })
  const signup = ({ username, email, password }) =>
    api.post('/auth/registration/', {
      username,
      email,
      password1: password,
      password2: password
    })
  const login = ({ username, email, password }) =>
    api.post('/auth/login/', {
      username,
      email,
      password: password
    })

  const submitRating = (spotUuid, userUuid, rating) => {
    api.post(`/games/${spotUuid}/reactions`, {
      // todo : construct proper post
    })
  }

  const createGame = ({ name }) =>
    api.post('/games/', {
      name,
      start_time: moment().toISOString(),
      rsvp_open_time: moment().toISOString(),
      rsvp_close_time: moment().toISOString(),
      end_time: moment().toISOString()
    })

  const setGameSport = ({ gameUUID, sportUUID }) =>
    api.post(`/games/${gameUUID}/sport/`, {
      uuid: sportUUID
    })
  const setGameSpot = ({ gameUUID, spotUUID }) =>
    api.post(`/games/${gameUUID}/spot/`, {
      uuid: spotUUID
    })
  const setGameTimes = ({ gameUUID, startTime, endTime }) =>
    api.put(`/games/${gameUUID}/`, {
      start_time: startTime,
      end_time: endTime,
      rsvp_open_time: startTime,
      rsvp_close_time: endTime
    })

  const setGameDescription = ({ gameUUID, description }) =>
    api.put(`/games/${gameUUID}/`, {
      description: description
    })

  // const setGameStartTime = ({ gameUUID, start_date, start_time }) => api.put(`/games/${gameUUID}/`), {
  //   start_time:
  // }

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getUser,
    getAllSpots,
    getSpot,
    getGame,
    getGames,
    createGame,
    setGameSport,
    setGameSpot,
    setGameTimes,
    setGameDescription,
    signup,
    login,
    submitRating,
    verifyToken,
    setToken: token => api.setHeader('Authorization', `JWT ${token}`)
  }
}

// let's return back our create method as the default.
export default {
  create
}
