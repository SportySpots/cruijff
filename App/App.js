import './Config'
import DebugConfig from './Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './Containers/RootContainer'
import { ApolloProvider } from 'react-apollo'
import initialize from './init'
import { store } from './Redux'
import { client } from './GraphQL'

/** STARTING POINT
  1. Initialize GraphQL Client
  2. Initialize Redux (createStore also launches Sagas)
  3. Get JWT From localStorage
  4. If JWT:
     - get UUID from query
  5. If not JWT:
     - show login screen.
**/

class App extends Component {
  async init () {
    await initialize()
    this.setState({ initialized: true })
  }

  constructor () {
    super()
    this.state = { initialized: false }
    this.init()
  }

  render () {
    if (!this.state.initialized) {
      return null
    }
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <RootContainer />
        </Provider>
      </ApolloProvider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default (DebugConfig.useReactotron ? console.tron.overlay(App) : App)
