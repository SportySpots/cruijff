import { createActions } from 'reduxsauce'

/* ------------- LocationTypes and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null
})

export const StartupTypes = Types
export default Creators
