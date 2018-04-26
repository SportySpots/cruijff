import './Config'
import DebugConfig from './Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import initialize from './init'
import { reduxStore } from './Redux'
import { client } from './GraphQL'
import { StatusBar, AsyncStorage } from 'react-native'
import AppNavigation from './Navigation/AppNavigation'
import Colors from './Themes/Colors'
import styled from 'styled-components'

class App extends Component {
  async init () {
    // build redux store & apollo client
    await initialize()
    const firstRun = !await AsyncStorage.getItem('hasBooted')
    AsyncStorage.setItem('hasBooted', 'true')
    this.setState({ initialized: true, firstRun })
  }

  constructor () {
    super()
    this.state = { initialized: false, firstRun: null }
    this.init()
  }

  render () {
    if (!this.state.initialized) {
      return null
    }
    return (
      <ApolloProvider client={client}>
        <Provider store={reduxStore}>
          <AppRootView>
            <StatusBar barStyle='light-content' />
            <AppNavigation
              initialRouteName={
                this.state.firstRun ? 'OnboardingScreen' : 'MainNav'
              }
            />
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

// allow reactotron overlay for fast design in dev mode
export default (DebugConfig.useReactotron ? console.tron.overlay(App) : App)
