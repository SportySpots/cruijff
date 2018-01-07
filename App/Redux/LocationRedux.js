import { createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getLocation: null
})

export const LocationTypes = Types
export default Creators
