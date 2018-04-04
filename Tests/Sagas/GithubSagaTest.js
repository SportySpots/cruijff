import FixtureAPI from '../../App/Services/FixtureApi'
import { put, call } from 'redux-saga/effects'
import { getUserAvatar } from '../../App/Sagas/GithubSagas'
import GithubActions from '../../App/Redux/GithubRedux'
import { path } from 'ramda'

const stepper = (fn) => (mock) => fn.next(mock).value

test.skip('first calls API', () => {
  const step = stepper(getUserAvatar(FixtureAPI, {username: 'taco'}))
  // first yield is API
  expect(step()).toEqual(call(FixtureAPI.getUser, 'taco'))
})

test.skip('success path', () => {
  const response = FixtureAPI.getUser('taco')
  const step = stepper(getUserAvatar(FixtureAPI, {username: 'taco'}))
  // first step API
  step()
  // Second step successful return
  const stepResponse = step(response)
  // Get the avatar Url from the response
  const firstUser = path(['data', 'items'], response)[0]
  const avatar = firstUser.avatar_url
  expect(stepResponse).toEqual(put(GithubActions.userSuccess(avatar)))
})

test.skip('failure path', () => {
  const response = {ok: false}
  const step = stepper(getUserAvatar(FixtureAPI, {username: 'taco'}))
  // first step API
  step()
  // Second step failed response
  expect(step(response)).toEqual(put(GithubActions.userFailure()))
})
