import './Config'
import DebugConfig from './Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './Containers/RootContainer'
import createStore from './Redux'
import { Text } from 'react-native'
import { createClient } from './GraphQL'
import { ApolloProvider } from 'react-apollo'
import { Users } from './Test'

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
  async initGraphQL () {
    const client = await createClient()
    this.setState({ client })
    console.log(client)
  }

  constructor () {
    super()
    this.state = { client: null }
    this.initGraphQL()
  }

  render () {
    if (!this.state.client) {
      return null
    }
    return (
      <ApolloProvider client={this.state.client}>
        <Provider store={store}>
          <Users />
        </Provider>
      </ApolloProvider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default (DebugConfig.useReactotron ? console.tron.overlay(App) : App)
