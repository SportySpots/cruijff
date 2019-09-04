/* eslint-disable no-underscore-dangle */
// import './polyfills';
import React, { Component } from 'react';
import Crashes from 'appcenter-crashes';

import codePush from 'react-native-code-push';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';

import { StatusBar } from 'react-native';
import firebase from 'react-native-firebase';
import { MenuProvider } from 'react-native-popup-menu';
import styled, { ThemeProvider } from 'styled-components/native';
import config from './config';
import client from './GraphQL/ApolloClient';
import AppNavigation, { getActiveRouteName } from './Navigation/AppNavigation';
import { getBottomSpace, ifIphoneX } from './iphoneHelpers';
import { LocationProvider } from './Context/Location';
import { UserProvider } from './Context/User';
import { SpotFiltersProvider } from './Context/SpotFilters';
import { Events, getInitialEvent, IncomingLinks } from './Services/IncomingLinks';
import globalRefs, { addGlobalRef } from './globalRefs';

import scTheme from './Themes/scTheme'; // styled-components theme
import { logNavigationState } from './utils';
import { CodePushProvider } from './Context/CodePush';

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
class App extends Component {
  constructor() {
    super();
    Crashes.setEnabled(true).then(() => {});
  }

  componentDidMount() {
    // signals codepush that the app is ready. If this is not called, CodePush rolls back
    // the last update.
    codePush.notifyAppReady();

    // create android notification channel to display notifications while app in foreground
    const channel = new firebase.notifications.Android
      .Channel('notifications', 'Notification Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('Notifications');
    firebase.notifications().android.createChannel(channel);

    firebase.messaging().hasPermission().then((result) => {
      console.log('has notification permission', result);
      if (!result) {
        firebase.messaging().requestPermission();
      }
    });

    // notification opened with app in foreground/background
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened(
      (notificationOpen) => {
        console.log('notificationOpened', notificationOpen);
      },
    );

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed(
      (notification) => {
        console.log('notificationDisplayed', notification);
      },
    );

    // notification received while app in foreground
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      console.log('notificationReceived', notification);
      // display the notification in system tray. Does not happen by default if app in foreground
      notification.android.setChannelId('notifications');
      notification.android.setSmallIcon('@drawable/notification_icon');
      notification.android.setColor('#00ff00');

      firebase.notifications().displayNotification(notification);
    });

    firebase.notifications().getInitialNotification().then((notification) => {
      if (notification) {
        // app was opened while closed by clicking a notification
        console.log('initialNotification', notification);
      }
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

    IncomingLinks.on(Events.MAGIC_LINK_LOGIN, (magicToken) => {
      this.router._navigation.navigate('ConfirmMagicTokenScreen', { magicToken });
    });

    IncomingLinks.on(Events.GAME_OPENED, (uuid) => {
      this.router._navigation.navigate('GameDetailsScreen', { uuid });
    });

    getInitialEvent().then((event) => {
      if (event
        && event.type
        && [Events.MAGIC_LINK_LOGIN, Events.GAME_OPENED].includes(event.type)
      ) {
        IncomingLinks.emitEvent(event);
      }
    });
  }

  componentWillUnmount() {
    // Linking.removeEventListener('url', this.appWokeUp);
    IncomingLinks.removeListener(Events.MAGIC_LINK_LOGIN, () => {});
    IncomingLinks.removeListener(Events.GAME_OPENED, () => {});
  }

  // NOTE: https://github.com/Microsoft/react-native-code-push/issues/516#issuecomment-275688344
  // To remove warning caused by required listener
  // update: removed this, seems only necessary if using codePush.sync()
  // eslint-disable-next-line
  // codePushDownloadDidProgress(progress) {}

  render() {
    console.log('render App');
    return (
      <ApolloProvider
        id="apollo"
        ref={addGlobalRef('apolloProvider')}
        // client={config.useFixtures ? mockClient : client} // TODO
        client={client}
      >
        <ApolloHooksProvider client={client} id="apollo-hooks">
          <CodePushProvider>
            <ThemeProvider theme={scTheme}>
              <UserProvider>
                <SpotFiltersProvider>
                  <LocationProvider>
                    <MenuProvider>
                      <AppRootView>
                        <StatusBar barStyle="light-content" />
                        {/* <ConnectionCheck /> */}
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
            </ThemeProvider>
          </CodePushProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}

export default App;
