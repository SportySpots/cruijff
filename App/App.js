/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import Crashes from 'appcenter-crashes';

import codePush from 'react-native-code-push';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';

import { StatusBar, Linking } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import styled from 'styled-components';

import { createClient, createMockClient } from './GraphQL/index';
import createStore from './Redux';

import ConnectionCheck from './Components/ConnectionCheck';
import AppNavigation from './Navigation/AppNavigation';
import Colors from './Themes/Colors';
import config from './config';

class App extends Component {
  constructor() {
    super();
    this.store = createStore();
    this.client = config.useFixtures ? createMockClient() : createClient(config.seedorfGraphQLUrl);
    this.state = { hasInitialized: false };
  }

  componentDidMount() {
    Crashes.setEnabled(true).then(() => {
      this.setState({ hasInitialized: true });
    });

    // this handles the case where the app is closed and is launched via Universal Linking.
    Linking.getInitialURL()
      .then((url) => {
        if (url) {
          // Alert.alert('GET INIT URL','initial url  ' + url)
          const uuid = url.replace(`https://${config.deeplinkHost}/games/`, '');
          this.router._navigation.navigate('GameDetailsScreen', { // eslint-disable-line no-underscore-dangle
            uuid,
          });
        }
      })
      .catch(console.log);

    // This listener handles the case where the app is woken up from the Universal or Deep Linking
    Linking.addEventListener('url', this.appWokeUp);
  }


  componentWillUnmount() {
    Linking.removeEventListener('url', this.appWokeUp);
  }

  appWokeUp = (event) => {
    // this handles the use case where the app is running in the background
    // and is activated by the listener...
    const uuid = event.url.replace(`https://${config.deeplinkHost}/games/`, '');
    this.router._navigation.navigate('GameDetailsScreen', { // eslint-disable-line no-underscore-dangle
      uuid,
    });
  }


  // NOTE: https://github.com/Microsoft/react-native-code-push/issues/516#issuecomment-275688344
  // To remove warning caused by required listener
  // eslint-disable-next-line
  codePushDownloadDidProgress(progress) {
  }

  render() {
    if (!this.state.hasInitialized) {
      return null;
    }
    return (
      <ApolloProvider client={this.client}>
        <Provider store={this.store}>
          <MenuProvider>
            <AppRootView>
              <StatusBar barStyle="light-content" />
              <ConnectionCheck />
              <AppNavigation ref={(ref) => { this.router = ref; }} initialRouteName="RootNav" />
            </AppRootView>
          </MenuProvider>
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

export default codePush(App);
