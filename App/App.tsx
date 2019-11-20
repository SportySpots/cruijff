/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import config from './config';
import Crashes from 'appcenter-crashes';
import codePush from 'react-native-code-push';
import firebase from 'react-native-firebase';
import client from './GraphQL/ApolloClient';
import AppNavigation, { getActiveRouteName } from './Navigation/AppNavigation';
import {
  NavigationActions,
  NavigationContainerComponent,
} from 'react-navigation';
import { logNavigationState } from './utils';
import {
  GameLinkOpenedEvent,
  MagicLinkLoginEvent,
  emitInitialLinkEvent
} from './Services/IncomingLinks';

import { MenuProvider } from 'react-native-popup-menu';
import { LocationProvider } from './Context/Location';
import { UserProvider } from './Context/User';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { CodePushProvider } from './Context/CodePush';
import { NotificationsProvider } from './Context/Notifications';

import styled, { ThemeProvider } from 'styled-components/native';
import { getBottomSpace, ifIphoneX } from './iphoneHelpers';
import scTheme from './Themes/scTheme'; // styled-components theme
import { StatusBar } from 'react-native';

import store from './Stores/SpotFilters';
setTimeout(() => {
  store.maxDistance = 99;
}, 1000)

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const AppRootView = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.black};
  margin-bottom: ${getBottomSpace()}px;
  margin-top: ${ifIphoneX() ? 30 : 0}px;
`;

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class App extends Component<{}, {}> {
  private router = React.createRef<NavigationContainerComponent>();

  constructor(props) {
    super(props);
    Crashes.setEnabled(true).then(() => null);

    // firebase.links().getInitialLink()
    //   .then((url) => {
    //     if (url) {
    //       console.log('LINKING: App opened from', url);
    //     } else {
    //       console.log('LINKING: App not opened through url');
    //     }
    //   });
    //
    // firebase.links().onLink((url) => {
    //   console.log('LINKING: App received link: ', url);
    // });
  }

  componentDidMount() {
    // signals codepush that the app is ready. If this is not called, CodePush rolls back
    // the last update.
    codePush.notifyAppReady();
    const router = this.router.current;
    MagicLinkLoginEvent.on(({token}) => {
      if (router) {
        router.dispatch(NavigationActions.navigate({
          routeName: 'ConfirmMagicTokenScreen',
          params: { magicToken: token },
        }));
      }
    })

    GameLinkOpenedEvent.on(({ uuid }) => {
      if (router) {
        router.dispatch(NavigationActions.navigate({
          routeName: 'GameDetailsScreen',
          params: { uuid },
        }));
      }
    })

    emitInitialLinkEvent();
  }

  componentWillUnmount() {
    // Linking.removeEventListener('url', this.appWokeUp);
    // IncomingLinks.removeListener(Events.MAGIC_LINK_LOGIN, () => {});
    // IncomingLinks.removeListener(Events.GAME_OPENED, () => {});
  }

  render() {
    return (
      <ApolloProvider
        // client={config.useFixtures ? mockClient : client} // TODO
        client={client}
      >
        <ApolloHooksProvider client={client}>
          <CodePushProvider>
            <ThemeProvider theme={scTheme}>
              <UserProvider>
                <NotificationsProvider>
                    <LocationProvider>
                      <MenuProvider>
                        <AppRootView>
                          <StatusBar barStyle="light-content" />
                          {/* <ConnectionCheck /> */}
                          <AppNavigation
                            ref={this.router}
                            // See: https://reactnavigation.org/docs/en/screen-tracking.html
                            onNavigationStateChange={(prevState, currState): void => {
                              if (config.logRoute) {
                                logNavigationState();
                              }
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
                </NotificationsProvider>
              </UserProvider>
            </ThemeProvider>
          </CodePushProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}

export default App;
