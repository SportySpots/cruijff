import R from 'ramda'
import Immutable from 'seamless-immutable'
import { createTransform } from 'redux-persist'

// is this object already Immutable?
const isImmutable = R.has('asMutable')

// change this Immutable object into a JS object
const convertToJs = (state) => state.asMutable({deep: true})

// optionally convert this object into a JS object if it is Immutable
const fromImmutable = R.when(isImmutable, convertToJs)

// convert this JS object into an Immutable object
const toImmutable = (raw) => Immutable(raw)

export default createTransform(
  // transform state coming from redux on its way to being serialized and stored
  (state, key) => toImmutable(state),
  // transform state coming from storage, on its way to be rehydrated into redux
  (state, key) => fromImmutable(state)
)
