import {
  addMockFunctionsToSchema,
  makeExecutableSchema,
  MockList
} from 'graphql-tools'
import { AsyncStorage } from 'react-native'
import { graphql, buildClientSchema } from 'graphql'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import faker from 'faker'
import { print } from 'graphql/language/printer'
import DebugConfig from '../Config/DebugConfig'
import { SchemaLink } from 'apollo-link-schema'
import gql from 'graphql-tag'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-boost'

export const createClient = async () => {
  if (DebugConfig.useFixtures) {
    return createMockClient()
  }

  const token = await AsyncStorage.getItem('TOKEN')
  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          )
        }
        if (networkError) console.log(`[Network error]: ${networkError}`)
      }),
      new HttpLink({
        uri: 'http://127.0.0.1:8000/graphql',
        headers: { authorization: `Bearer ${token}` }
      })
    ]),
    cache: new InMemoryCache()
  })
}

const createMockClient = () => {
  const schema = buildClientSchema(require('../../schema.graphql.json'))
  addMockFunctionsToSchema({
    schema,
    mocks: {
      Query: () => ({
        spots: () => new MockList([3, 5])
      }),
      SpotType: () => ({
        name: () => faker.lorem.words(2)
      }),
      UUID: faker.random.uuid
    },
    preserveResolvers: false
  })
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema })
  })
}
