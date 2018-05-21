import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import { createClient, createMockClient } from './GraphQL/index';
import AppNavigation from './Navigation/AppNavigation';
import createStore from './Redux';
import Colors from './Themes/Colors';
import config from './config';
import codePush from "react-native-code-push";


class App extends Component {
  constructor() {
    super();
    this.store = createStore();
    this.client = config.useFixtures ? createMockClient() : createClient(config.seedorfGraphQLUrl);
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        <Provider store={this.store}>
          <AppRootView>
            <StatusBar barStyle="light-content" />
            <AppNavigation initialRouteName="RootNav" />
          </AppRootView>
        </Provider>
      </ApolloProvider>
    );
  }
}

const AppRootView = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${Colors.white};
`;

App = codePush(App);

export default App;
