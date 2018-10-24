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

import ConnectionCheck from './Components/Common/ConnectionCheck';
import AppNavigation from './Navigation/AppNavigation';
import Colors from './Themes/Colors';
import config from './config';
import scopedEval from './scopedEval';
import globalRefs, { addGlobalRef } from './globalRefs';
import { getBottomSpace, getStatusBarHeight, ifIphoneX } from './iphoneHelpers';

export class App extends Component {
  constructor() {
    super();
    this.store = createStore();
    this.client = config.useFixtures ? createMockClient() : createClient(config.seedorfGraphQLUrl);
    this.state = { hasInitialized: false };

    if (config.testBuild) {
      try {
        console.warn('running a test image. not good if in production');
        console.log('config', config);

        // eslint-disable-next-line no-undef
        const ws = new WebSocket(config.testHostUrl);

        ws.onopen = () => {
          console.log('RN <-> detox connected');
        };

        ws.onmessage = (e) => {
          // a message was received
          const result = scopedEval(e.data);
          Promise.resolve(result.response).then((val) => {
            try {
              ws.send(JSON.stringify({ hasError: false, error: null, response: val }));
            } catch (err) {
              ws.send(JSON.stringify({
                hasError: false,
                response: 'cannot jsonify',
                error: null,
              }));
            }
          });
        };

        ws.onerror = (e) => {
          // an error occurred
          console.warn(e.message);
        };

        ws.onclose = (e) => {
          // connection closed
          console.log(e.code, e.reason);
        };
      } catch (e) {
        console.warn(e);
      }
    }
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
    const { state } = this;
    if (!state.hasInitialized) {
      return null;
    }
    return (
      <ApolloProvider
        id="apollo"
        ref={addGlobalRef('apolloProvider')}
        client={this.client}
      >
        <Provider store={this.store}>
          <MenuProvider>
            <AppRootView>
              <StatusBar barStyle="light-content" />
              <ConnectionCheck />
              <AppNavigation ref={(ref) => { this.router = ref; globalRefs.rootNavigator = ref; }} initialRouteName="RootNav" />
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
  background-color: ${Colors.black};
  margin-bottom: ${getBottomSpace()}px;
  margin-top: ${ifIphoneX() ? 30 : 0}px;
`;

export default codePush(App);
