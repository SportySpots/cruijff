import './Config'
import DebugConfig from './Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './Containers/RootContainer'
import createStore from './Redux'

import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import { graphql, buildClientSchema } from 'graphql'
import { AsyncStorage } from 'react-native'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import faker from 'faker'

window.setTimeout(async () => {
  const token = await AsyncStorage.getItem('TOKEN', console.log)
  const client = new ApolloClient({
    uri: 'http://127.0.0.1:8000/graphql',
    cache: new InMemoryCache()
  })
  const schema = buildClientSchema(require('../schema.graphql.json'))
  addMockFunctionsToSchema({
    schema,
    mocks: {
      UUID: () => faker.random.uuid()
    }
  })

  const query = `
      {
          spots {
            uuid, 
            spotGames { 
              uuid 
            }
          },
        }
    `
  graphql(schema, query).then(result => console.log('Got result', result))
}, 1000)

// create our store
const store = createStore()
console.log(store.getState())

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default (DebugConfig.useReactotron ? console.tron.overlay(App) : App)
