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
import client from './GraphQL/ApolloClient';
// import mockClient from './GraphQL/ApolloMockClient';
import ConnectionCheck from './Components/Common/ConnectionCheck';
import AppNavigation, { getActiveRouteName } from './Navigation/AppNavigation';
import { getBottomSpace, ifIphoneX } from './iphoneHelpers';
import { LocationProvider, LocationConsumer } from './Context/Location';
import { UserProvider } from './Context/User';
import { SpotFiltersProvider } from './Context/SpotFilters';
import { Events, IncomingLinks, getInitialEvent } from './Services/IncomingLinks';
import globalRefs, { addGlobalRef } from './globalRefs';

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

    codePush.checkForUpdate().then(r => console.log('codepush', r));
    Crashes.setEnabled(true).then(() => {});
  }

  // afterRouterRendered(router) {
  //   // use afterRouterRenderedHasRun so that this is only executed once (in case of App rerender)
  //   if (!this.afterRouterRenderedHasRun) {
  //     this.afterRouterRenderedHasRun = true;
  //     getInitialEvent().then((event) => {
  //       console.log('initial event', event, this.router);
  //       if (event) {
  //         switch (event.type) {
  //           case Events.GAME_OPENED:
  //             router._navigation.navigate('GameDetailsScreen', { uuid: event.args[0] });
  //             break;
  //           case Events.MAGIC_LINK_LOGIN:
  //             router._navigation.navigate('ConfirmMagicTokenScreen', { magicToken: event.args[0] });
  //             break;
  //           default:
  //             break;
  //         }
  //       }
  //     });
  //   }
  // }

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

    // getInitialEvent().then((event) => {
    //   console.log('initial event', event, this.router);
    //   if (event) {
    //     switch (event.type) {
    //       case Events.GAME_OPENED:
    //         this.router._navigation.navigate('GameDetailsScreen', { uuid: event.args[0] });
    //         break;
    //       case Events.MAGIC_LINK_LOGIN:
    //         this.router._navigation.navigate('ConfirmMagicTokenScreen', { magicToken: event.args[0] });
    //         break;
    //       default:
    //         break;
    //     }
    //   }
    // });

    IncomingLinks.on(Events.MAGIC_LINK_LOGIN, (magicToken) => {
      this.router._navigation.navigate('ConfirmMagicTokenScreen', { magicToken });
    });

    IncomingLinks.on(Events.GAME_OPENED, (uuid) => {
      this.router._navigation.navigate('GameDetailsScreen', { uuid });
    });
  }

  componentWillUnmount() {
    // Linking.removeEventListener('url', this.appWokeUp);
    IncomingLinks.removeListener(Events.MAGIC_LINK_LOGIN, () => {});
    IncomingLinks.removeListener(Events.GAME_OPENED, () => {});
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
        // client={this.client}
        // client={config.useFixtures ? mockClient : client} // TODO: fix mockClient
        client={client}
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


// /* eslint-disable no-underscore-dangle */
// import React, { Component } from 'react';
// import Crashes from 'appcenter-crashes';

// import codePush from 'react-native-code-push';
// import { ApolloProvider } from 'react-apollo';

// import { StatusBar } from 'react-native';
// import firebase from 'react-native-firebase';
// import { MenuProvider } from 'react-native-popup-menu';
// import styled from 'styled-components';
// import config from './config';
// import client from './GraphQL/ApolloClient';
// // import mockClient from './GraphQL/ApolloMockClient';
// import ConnectionCheck from './Components/Common/ConnectionCheck';
// import AppNavigation, { getActiveRouteName } from './Navigation/AppNavigation';
// import { getBottomSpace, ifIphoneX } from './iphoneHelpers';
// import { LocationProvider, LocationConsumer } from './Context/Location';
// import { UserProvider } from './Context/User';
// import { SpotFiltersProvider } from './Context/SpotFilters';
// import { Events, IncomingLinks, getInitialEvent } from './Services/IncomingLinks';
// import globalRefs, { addGlobalRef } from './globalRefs';

// import Colors from './Themes/Colors';
// import { logNavigationState } from './utils';

// class App extends Component {
//   constructor() {
//     super();
//     (async () => {
//       try {
//         const fcmToken = await firebase.messaging().getToken();
//         console.log('fcmToken', fcmToken);
//       } catch (error) {
//         console.log('error getting fcmToken', error);
//       }
//     })();

//     codePush.checkForUpdate().then(r => console.log('codepush', r));
//     Crashes.setEnabled(true).then(() => {});
//   }

//   // afterRouterRendered(router) {
//   //   // use afterRouterRenderedHasRun so that this is only executed once (in case of App rerender)
//   //   if (!this.afterRouterRenderedHasRun) {
//   //     this.afterRouterRenderedHasRun = true;
//   //     getInitialEvent().then((event) => {
//   //       console.log('initial event', event, this.router);
//   //       if (event) {
//   //         switch (event.type) {
//   //           case Events.GAME_OPENED:
//   //             router._navigation.navigate('GameDetailsScreen', { uuid: event.args[0] });
//   //             break;
//   //           case Events.MAGIC_LINK_LOGIN:
//   //             router._navigation.navigate('ConfirmMagicTokenScreen', { magicToken: event.args[0] });
//   //             break;
//   //           default:
//   //             break;
//   //         }
//   //       }
//   //     });
//   //   }
//   // }

//   componentDidMount() {
//     firebase.links().getInitialLink()
//       .then((url) => {
//         if (url) {
//           console.log('LINKING: App opened from', url);
//         } else {
//           console.log('LINKING: App not opened through url');
//         }
//       });

//     firebase.links().onLink((url) => {
//       console.log('LINKING: App received link: ', url);
//     });

//     // getInitialEvent().then((event) => {
//     //   console.log('initial event', event, this.router);
//     //   if (event) {
//     //     switch (event.type) {
//     //       case Events.GAME_OPENED:
//     //         this.router._navigation.navigate('GameDetailsScreen', { uuid: event.args[0] });
//     //         break;
//     //       case Events.MAGIC_LINK_LOGIN:
//     //         this.router._navigation.navigate('ConfirmMagicTokenScreen', { magicToken: event.args[0] });
//     //         break;
//     //       default:
//     //         break;
//     //     }
//     //   }
//     // });

//     IncomingLinks.on(Events.MAGIC_LINK_LOGIN, (magicToken) => {
//       this.router._navigation.navigate('ConfirmMagicTokenScreen', { magicToken });
//     });

//     IncomingLinks.on(Events.GAME_OPENED, (uuid) => {
//       this.router._navigation.navigate('GameDetailsScreen', { uuid });
//     });
//   }

//   componentWillUnmount() {
//     // Linking.removeEventListener('url', this.appWokeUp);
//     IncomingLinks.removeListener(Events.MAGIC_LINK_LOGIN, () => {});
//     IncomingLinks.removeListener(Events.GAME_OPENED, () => {});
//     // IncomingLinks.removeListener(Events.LOGIN_TOKEN, this.loginWithToken);
//   }

//   // NOTE: https://github.com/Microsoft/react-native-code-push/issues/516#issuecomment-275688344
//   // To remove warning caused by required listener
//   // eslint-disable-next-line
//   codePushDownloadDidProgress(progress) {}

//   render() {
//     console.log('render App');
//     return (
//       <ApolloProvider
//         id="apollo"
//         ref={addGlobalRef('apolloProvider')}
//         // client={this.client}
//         // client={config.useFixtures ? mockClient : client}
//         client={client}
//       >
//         <UserProvider>
//           <SpotFiltersProvider>
//             <LocationProvider>
//               <MenuProvider>
//                 <AppRootView>
//                   <StatusBar barStyle="light-content" />
//                   <ConnectionCheck />
//                   <LocationConsumer>
//                     {({ location }) => (
//                       <AppNavigation
//                         ref={(ref) => {
//                           this.router = ref;
//                           globalRefs.rootNavigator = ref;
//                         }}
//                         // See: https://reactnavigation.org/docs/en/screen-tracking.html
//                         onNavigationStateChange={(prevState, currState) => {
//                           if (config.logRoute) logNavigationState();
//                           const currScreen = getActiveRouteName(currState);
//                           const prevScreen = getActiveRouteName(prevState);
//                           if (prevScreen !== currScreen) {
//                             firebase.analytics().setCurrentScreen(currScreen);
//                           }
//                         }}
//                         // screenProps={{ location }} // make location available for all screens
//                       />
//                     )}
//                   </LocationConsumer>
//                 </AppRootView>
//               </MenuProvider>
//             </LocationProvider>
//           </SpotFiltersProvider>
//         </UserProvider>
//       </ApolloProvider>
//     );
//   }
// }

// const AppRootView = styled.View`
//   flex: 1;
//   flex-direction: column;
//   background-color: ${Colors.black};
//   margin-bottom: ${getBottomSpace()}px;
//   margin-top: ${ifIphoneX() ? 30 : 0}px;
// `;

// export default codePush(App);
