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
import OneSignal from 'react-native-onesignal';

class App extends Component {
  constructor() {
    super();
    this.store = createStore();
    this.client = config.useFixtures ? createMockClient() : createClient(config.seedorfGraphQLUrl);
  }

  // NOTE: https://github.com/Microsoft/react-native-code-push/issues/516#issuecomment-275688344
  // To remove warning caused by required listener
  codePushDownloadDidProgress(progress) {
  }

  componentWillMount() {
    console.log(OneSignal);
    OneSignal.init('YOUR_ONESIGNAL_APPID');

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
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

export default codePush(App);
