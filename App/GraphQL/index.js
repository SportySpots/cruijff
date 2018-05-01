import { buildClientSchema } from 'graphql'

import { addMockFunctionsToSchema } from 'graphql-tools'
import ApolloClient from 'apollo-client'
import { SchemaLink } from 'apollo-link-schema'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'

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

export const createClient = uri => {
  let token = null
  const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: `token ${token}`,
        cookie: null
      }
    })
    return forward(operation)
  })

  const httpLink = new HttpLink({
    uri
  })

  client = new ApolloClient({
    link: addErrorHandlers(middlewareLink.concat(httpLink)),
    cache: createCache()
  })
  client.setToken = t => {
    token = t
  }
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
  client.setToken = () => null
  return client
}

export const WithApolloMockProvider = props => (
  <ApolloProvider client={createMockClient()}>{props.children}</ApolloProvider>
)
