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
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';

import styled, { ThemeProvider } from 'styled-components/native';
import { getBottomSpace, ifIphoneX } from './iphoneHelpers';
import scTheme from './Themes/scTheme'; // styled-components theme
import { StatusBar } from 'react-native';

import store from './Stores/SpotFilters';
import { NotificationsManager } from "App/Services/Notifications";
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

export const rootRouter = React.createRef<NavigationContainerComponent>();
if (__DEV__) {
  // @ts-ignore
  window.router = rootRouter;
}
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class App extends Component<{}, {}> {
  constructor(props) {
    super(props);
    Crashes.setEnabled(true).then(() => null);
  }

  componentDidMount() {
    // signals codepush that the app is ready. If this is not called, CodePush rolls back
    // the last update.
    codePush.notifyAppReady();

    new NotificationsManager();

    const router = rootRouter.current;

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
          <ThemeProvider theme={scTheme}>
            <MenuProvider>
              <AppRootView>
                <StatusBar barStyle="light-content" />
                {/* <ConnectionCheck /> */}
                <AppNavigation
                  ref={rootRouter}
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
          </ThemeProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}

export default App;
