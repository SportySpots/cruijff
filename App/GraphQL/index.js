import { buildClientSchema } from 'graphql'

import { addMockFunctionsToSchema } from 'graphql-tools'
import ApolloClient from 'apollo-client'
import { SchemaLink } from 'apollo-link-schema'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { AsyncStorage } from 'react-native'

import mocks from './mocks'
import ApolloProvider from 'react-apollo/ApolloProvider'
import React from 'react'

export let client = null

const createCache = () => {
  return new InMemoryCache({
    dataIdFromObject: object => object.uuid || null
  })
}

const addErrorHandlers = link => {
  return ApolloLink.from([
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
    link
  ])
}

export const createClient = async uri => {
  const token = await AsyncStorage.getItem('TOKEN')
  client = new ApolloClient({
    link: addErrorHandlers(
      new HttpLink({
        uri,
        headers: { authorization: `Bearer ${token}` }
      })
    ),
    cache: createCache()
  })
  return client
}

export const createMockClient = () => {
  const schema = buildClientSchema(require('../../schema.graphql.json'))
  addMockFunctionsToSchema({
    schema,
    mocks,
    preserveResolvers: false
  })
  client = new ApolloClient({
    cache: createCache(),
    link: addErrorHandlers(new SchemaLink({ schema }))
  })
  return client
}

export const WithApolloMockProvider = props => (
  <ApolloProvider client={createMockClient()}>{props.children}</ApolloProvider>
)
