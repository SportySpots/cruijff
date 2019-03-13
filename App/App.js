/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import Crashes from 'appcenter-crashes';

import codePush from 'react-native-code-push';
import { ApolloProvider } from 'react-apollo';

import { StatusBar } from 'react-native';
import firebase from 'react-native-firebase';
import { MenuProvider } from 'react-native-popup-menu';
import styled from 'styled-components';
import config from './config';
import { createClient, createMockClient } from './GraphQL';
import ConnectionCheck from './Components/Common/ConnectionCheck';
import AppNavigation, { getActiveRouteName } from './Navigation/AppNavigation';
import { getBottomSpace, ifIphoneX } from './iphoneHelpers';
import { LocationProvider } from './Context/Location';
import { UserProvider } from './Context/User';
import { SpotFiltersProvider } from './Context/SpotFilters';
import { Events, IncomingLinks, urlToEvent } from './Services/IncomingLinks';
import globalRefs, { addGlobalRef } from './globalRefs';
import { setupDetoxConnection } from './detoxHelpers';

import Colors from './Themes/Colors';
import { logNavigationState } from './utils';

class App extends Component {
  constructor() {
    super();
    (async () => {
      try {
        const fcmToken = await firebase.messaging().getToken();
        console.log('fcmToken', fcmToken);
      } catch (error) {
        console.log('error getting fcmToken', error);
      }
    })();
    this.client = config.useFixtures ? createMockClient() : createClient(config.seedorfGraphQLUrl);
    this.state = { hasInitialized: false };

    if (config.testBuild) {
      setupDetoxConnection();
    }
  }

  async componentWillMount() {
    IncomingLinks.on(Events.MAGIC_LINK_LOGIN, (magicToken) => {
      // eslint-next-line no-underscore-dangle
      this.router._navigation.navigate('ConfirmMagicTokenScreen', { magicToken });
    });
    // IncomingLinks.on(Events.LOGIN_TOKEN, this.loginWithToken);

    const initialURL = await firebase.links().getInitialLink();
    const knowEvents = [Events.MAGIC_LINK_LOGIN, Events.LOGIN_TOKEN];

    if (initialURL) {
      const event = urlToEvent(initialURL);
      if (event && event.type && knowEvents.includes(event.type)) {
        IncomingLinks.emitEvent(event);
      }
    }
  }

  componentDidMount() {
    codePush.checkForUpdate().then(r => console.log('codepush', r));
    Crashes.setEnabled(true).then(() => {
      this.setState({ hasInitialized: true });
    });

    firebase.links().getInitialLink()
      .then((url) => {
        if (url) {
          console.log('LINKING: App opened from', url);
        } else {
          console.log('LINKING: App not opened through url');
        }
      });

    firebase.links().onLink((url) => {
      console.log('LINKING: App received link: ', url);
    });

    // this handles the case where the app is closed and is launched via Universal Linking.
    // Linking.getInitialURL()
    //   .then((url) => {
    //     if (url) {
    //       // Alert.alert('GET INIT URL','initial url  ' + url)
    //       console.log('LINKING: initial url:', url);
    //       const uuid = url.replace(`https://${config.deeplinkHost}/games/`, '');
    //       this.router._navigation.navigate('GameDetailsScreen', { // eslint-disable-line no-underscore-dangle
    //         uuid,
    //       });
    //     }
    //   })
    //   .catch(console.log);
    //
    // // This listener handles the case where the app is woken up from the Universal or Deep Linking
    // Linking.addEventListener('url', this.appWokeUp);
  }


  componentWillUnmount() {
    // Linking.removeEventListener('url', this.appWokeUp);
    IncomingLinks.removeListener(Events.MAGIC_LINK_LOGIN, () => {});
    // IncomingLinks.removeListener(Events.LOGIN_TOKEN, this.loginWithToken);
  }

  appWokeUp = (event) => {
    // this handles the use case where the app is running in the background
    // and is activated by the listener...
    console.log('LINKING: WOKE UP', event);
    const uuid = event.url.replace(`https://${config.deeplinkHost}/games/`, '');
    // eslint-next-line no-underscore-dangle
    this.router._navigation.navigate('GameDetailsScreen', { uuid });
  }


  // NOTE: https://github.com/Microsoft/react-native-code-push/issues/516#issuecomment-275688344
  // To remove warning caused by required listener
  // eslint-disable-next-line
  codePushDownloadDidProgress(progress) {}

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
        <UserProvider>
          <SpotFiltersProvider>
            <LocationProvider>
              <MenuProvider>
                <AppRootView>
                  <StatusBar barStyle="light-content" />
                  <ConnectionCheck />
                  <AppNavigation
                    ref={(ref) => {
                      this.router = ref;
                      globalRefs.rootNavigator = ref;
                    }}
                    // See: https://reactnavigation.org/docs/en/screen-tracking.html
                    onNavigationStateChange={(prevState, currState) => {
                      if (config.logRoute) logNavigationState();
                      const currScreen = getActiveRouteName(currState);
                      const prevScreen = getActiveRouteName(prevState);
                      if (prevScreen !== currScreen) {
                        firebase.analytics().setCurrentScreen(currScreen);
                      }
                    }}
                  />
                </AppRootView>
              </MenuProvider>
            </LocationProvider>
          </SpotFiltersProvider>
        </UserProvider>
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
