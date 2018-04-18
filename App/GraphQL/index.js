import { addMockFunctionsToSchema } from 'graphql-tools'
import { AsyncStorage } from 'react-native'
import { graphql, buildClientSchema } from 'graphql'
import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import faker from 'faker'
import { print } from 'graphql/language/printer'
import DebugConfig from '../Config/DebugConfig'
import { SchemaLink } from 'apollo-link-schema'
import gql from 'graphql-tag'
import { ApolloLink } from 'apollo-link'

export const createClient = async () => {
  if (DebugConfig.useFixtures) {
    return createMockClient()
  }

  const token = await AsyncStorage.getItem('TOKEN')

  return new ApolloClient({
    uri: 'http://127.0.0.1:8000/graphql',
    cache: new InMemoryCache(),
    fetchOptions: {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  })
}

const createMockClient = () => {
  const schema = buildClientSchema(require('../../schema.graphql.json'))
  addMockFunctionsToSchema({
    schema,
    mocks: {
      UUID: () => faker.random.uuid()
    }
  })
  // https://github.com/jdachtera/redux-observable-apollo-mock/blob/ba0f300fe1533a42d7d5eb1ca81e56e0ae44475d/src/createMockLink.js
  const schemaLink = new SchemaLink({ schema })
  const promises = []
  const waitLink = new ApolloLink((operation, forward) => {
    const res = forward(operation)
    promises.push(
      new Promise(resolve => res.map(data => process.nextTick(resolve) && data))
    )
    return res
  })
  const finalLink = {
    link: waitLink.concat(schemaLink),
    flush: () => Promise.all(promises)
  }
  const apolloCache = new InMemoryCache(window.__APOLLO_STATE__)
  return new ApolloClient({
    cache: apolloCache,
    uri: 'http://graphql',
    link: finalLink
  })
}

// const query = `
//     {
//         spots {
//           uuid,
//           spotGames {
//             uuid
//           }
//         },
//       }
//   `
// graphql(schema, query).then(result => console.log('Got result', result))
