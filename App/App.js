import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import { StatusBar } from 'react-native'
import AppNavigation from './Navigation/AppNavigation'
import Colors from './Themes/Colors'
import styled from 'styled-components'
import createStore from './Redux'
import { createClient, createMockClient } from './GraphQL/index'
import config from './config'

class App extends Component {
  constructor () {
    super()
    this.store = createStore()
    this.client = config.useFixtures
      ? createMockClient()
      : createClient(config.seedorfGraphQLUrl)
  }

  render () {
    return (
      <ApolloProvider client={this.client}>
        <Provider store={this.store}>
          <AppRootView>
            <StatusBar barStyle='light-content' />
            <AppNavigation initialRouteName='SplashScreen' />
          </AppRootView>
        </Provider>
      </ApolloProvider>
    )
  }
}

const AppRootView = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${Colors.white};
`

export default App
