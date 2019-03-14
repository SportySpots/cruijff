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
import { UserConsumer, UserProvider } from './Context/User';
import { SpotFiltersProvider } from './Context/SpotFilters';
import { Events, IncomingLinks, getInitialEvent } from './Services/IncomingLinks';
import globalRefs, { addGlobalRef } from './globalRefs';

import Colors from './Themes/Colors';
import { logNavigationState } from './utils';
import CenteredActivityIndicator from './Components/Common/CenteredActivityIndicator';

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

    codePush.checkForUpdate().then(r => console.log('codepush', r));
    Crashes.setEnabled(true).then(() => {});
  }

  componentWillUpdate() {

  }

  afterRouterRendered() {
    // use routerHasRendered so that this is only executed once
    if (!this.routerHasRendered) {
      this.routerHasRendered = true;
      getInitialEvent().then((event) => {
        console.log('initial event', event, this.router);
        if (event) {
          switch (event.type) {
            case Events.GAME_OPENED:
              this.router._navigation.navigate('GameDetailsScreen', { uuid: event.args[0] });
              break;
            case Events.MAGIC_LINK_LOGIN:
              this.router._navigation.navigate('ConfirmMagicTokenScreen', { magicToken: event.args[0] });
              break;
            default:
              break;
          }
        }
      });
    }
  }

  componentDidMount() {
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

    IncomingLinks.on(Events.GAME_OPENED, (uuid) => {
      this.router._navigation.navigate('GameDetailsScreen', { uuid }); // eslint-disable-line no-underscore-dangle
    });

    IncomingLinks.on(Events.MAGIC_LINK_LOGIN, (magicToken) => {
      // eslint-next-line no-underscore-dangle
      this.router._navigation.navigate('ConfirmMagicTokenScreen', { magicToken });
    });
  }

  componentWillUnmount() {
    // Linking.removeEventListener('url', this.appWokeUp);
    IncomingLinks.removeListener(Events.MAGIC_LINK_LOGIN, () => {});
    // IncomingLinks.removeListener(Events.LOGIN_TOKEN, this.loginWithToken);
  }

  // NOTE: https://github.com/Microsoft/react-native-code-push/issues/516#issuecomment-275688344
  // To remove warning caused by required listener
  // eslint-disable-next-line
  codePushDownloadDidProgress(progress) {}

  render() {
    console.log('render App');
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
                  <UserConsumer>
                    {(userProps) => {
                      // show activity indicator while user object is not initialized
                      if (userProps.user === undefined) {
                        return <CenteredActivityIndicator />;
                      }
                      return (
                        <AppNavigation
                          ref={(ref) => {
                            this.router = ref;
                            globalRefs.rootNavigator = ref;
                            this.afterRouterRendered();
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
                      );
                    }}
                  </UserConsumer>
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
