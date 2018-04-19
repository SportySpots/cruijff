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
