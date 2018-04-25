import createStore from './Redux'
import { createClient, createMockClient } from './GraphQL'
import DebugConfig from './Config/DebugConfig'

export const initGraphQL = async () => {
  return DebugConfig.useFixtures
    ? createMockClient()
    : createClient(
        __DEV__
          ? 'http://localhost:8000/graphql'
          : // ? 'http://10.0.3.2:8000/graphql'
            'https://sportyspots.com/api/graphql'
      )
}

const initialize = async () => {
  console.log('init started')
  createStore()
  await initGraphQL()
  console.log('initialization complete')
}

export default initialize
