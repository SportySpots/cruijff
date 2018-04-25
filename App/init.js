import createStore from './Redux'
import { createClient, createMockClient } from './GraphQL'
import DebugConfig from './Config/DebugConfig'

export const initGraphQL = async () => {
  return DebugConfig.useFixtures
    ? createMockClient()
    : createClient(
        __DEV__
          ? // ? 'http://10.0.3.2:8000/graphql'
            'http://localhost:8000/graphql'
          : 'https://sportyspots.com/api/graphql'
      )
}

const initialize = async () => {
  console.log('init started')
  const store = createStore()
  const client = await initGraphQL()
}

export default initialize
