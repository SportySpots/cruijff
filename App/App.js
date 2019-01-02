/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import Crashes from 'appcenter-crashes';

import codePush from 'react-native-code-push';
import { ApolloProvider } from 'react-apollo';

import { StatusBar, Linking } from 'react-native';
import Config from 'react-native-config';
import { MenuProvider } from 'react-native-popup-menu';
import RNUxcam from 'react-native-ux-cam';
import styled from 'styled-components';
import config from './config';
import { createClient, createMockClient } from './GraphQL';
import ConnectionCheck from './Components/Common/ConnectionCheck';
import AppNavigation from './Navigation/AppNavigation';
import { getBottomSpace, ifIphoneX } from './iphoneHelpers';
import { LocationProvider } from './Context/Location';
import { UserProvider } from './Context/User';
import { SpotFiltersProvider } from './Context/SpotFilters';

import globalRefs, { addGlobalRef } from './globalRefs';
import { setupDetoxConnection } from './detoxHelpers';

import Colors from './Themes/Colors';

// Only enable uxcam on production
const { UXCAM_KEY } = Config;
if (!__DEV__) {
  if (!UXCAM_KEY) {
    throw new Error('UXCAM_KEY env var missing');
  } else {
    RNUxcam.startWithKey(UXCAM_KEY);
  }
}

class App extends Component {
  constructor() {
    super();
    this.client = config.useFixtures ? createMockClient() : createClient(config.seedorfGraphQLUrl);
    this.state = { hasInitialized: false };

    if (config.testBuild) {
      setupDetoxConnection();
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
        <UserProvider>
          <SpotFiltersProvider>
            <LocationProvider>
              <MenuProvider>
                <AppRootView>
                  <StatusBar barStyle="light-content" />
                  <ConnectionCheck />
                  <AppNavigation ref={(ref) => { this.router = ref; globalRefs.rootNavigator = ref; }} initialRouteName="RootNav" />
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
