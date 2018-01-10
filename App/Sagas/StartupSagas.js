import { log, LEVEL } from '../Services/Log'

// process STARTUP actions
export function * startup (action) {
  log(LEVEL.INFO, 'STARTING')
}
