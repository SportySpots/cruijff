import { RootNav } from '../Navigation/AppNavigation'

export const reducer = (state, action) => {
  const newState = RootNav.router.getStateForAction(action, state)
  return newState || state
}
