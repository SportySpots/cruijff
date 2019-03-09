import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import { withLocation, locationPropTypes } from '../../Context/Location';
import SplashScreen from '../../Screens/Splash/SplashScreen';
import LoggedOutRoute from '../LoggedOutRoute';
import AuthScreens from './AuthScreens';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const handleLoggedIn = async (navigation) => {
  console.log('pop to Main or Onboarding', navigation.state);
  // In case the user is logged in when trying to access the SplashScreen,
  // redirect him to MainNav unless onboarding isn't completed yet.
  let location = null;

  const locationJSON = await AsyncStorage.getItem('userLocation'); // { id, city, country, coords: { latitude, longitude } }
  if (locationJSON) {
    location = JSON.parse(locationJSON);
  }

  navigation.navigate(location ? 'MainNav' : 'OnboardingScreen');
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SplashNav = createStackNavigator({
  ...AuthScreens,
  SplashScreen: {
    screen: ({ navigation }) => (
      <LoggedOutRoute
        navigation={navigation}
        component={SplashScreen}
        onLoggedIn={() => { handleLoggedIn(navigation); }}
      />
    ),
    navigationOptions: { header: null },
  },
}, {
  // Default config for all screens
  initialRouteName: 'SplashScreen',
  tabBarComponent: () => null,
});

export default SplashNav;


// import React from 'react';
// import PropTypes from 'prop-types';
// import { createStackNavigator } from 'react-navigation';
// import { withLocation, locationPropTypes } from '../../Context/Location';
// import SplashScreen from '../../Screens/Splash/SplashScreen';
// import LoggedOutRoute from '../LoggedOutRoute';
// import AuthScreens from './AuthScreens';

// //------------------------------------------------------------------------------
// // AUX FUNCTIONS:
// //------------------------------------------------------------------------------
// const handleLoggedIn = (navigation, location) => {
//   console.log('pop to Main or Onboarding!!!! navigation', navigation.state);
//   console.log('pop to Main or Onboarding!!!! location', location);
//   // In case the user is logged in when trying to access the SplashScreen,
//   // redirect him to MainNav unless onboarding isn't completed yet.
//   navigation.navigate(location ? 'MainNav' : 'OnboardingScreen');
// };
// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// const SplashNav = ({ navigation, location }) => (
//   React.createElement(createStackNavigator({
//     ...AuthScreens,
//     SplashScreen: {
//       screen: () => (
//         <LoggedOutRoute
//           navigation={navigation}
//           component={SplashScreen}
//           onLoggedIn={() => { handleLoggedIn(navigation, location); }}
//         />
//       ),
//       navigationOptions: { header: null },
//     },
//   }, {
//     // Default config for all screens
//     initialRouteName: 'SplashScreen',
//     tabBarComponent: () => null,
//   }))
// );

// SplashNav.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
//   location: locationPropTypes.location,
// };

// SplashNav.defaultProps = {
//   location: null,
// };

// export default withLocation(SplashNav);



// import React from 'react';
// import PropTypes from 'prop-types';
// import { createStackNavigator } from 'react-navigation';
// import { withLocation, locationPropTypes } from '../../Context/Location';
// import SplashScreen from '../../Screens/Splash/SplashScreen';
// import LoggedOutRoute from '../LoggedOutRoute';
// import AuthScreens from './AuthScreens';

// //------------------------------------------------------------------------------
// // AUX FUNCTIONS:
// //------------------------------------------------------------------------------
// const handleLoggedIn = (navigation, location) => {
//   console.log('pop to Main or Onboarding', navigation.state);
//   // In case the user is logged in when trying to access the SplashScreen,
//   // redirect him to MainNav unless onboarding isn't completed yet.
//   navigation.navigate(location ? 'MainNav' : 'OnboardingScreen');
// };
// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// const SplashNav = ({ location, navigation }) => (
//   React.createElement(createStackNavigator({
//     ...AuthScreens,
//     SplashScreen: {
//       screen: () => (
//         <LoggedOutRoute
//           navigation={navigation}
//           component={SplashScreen}
//           onLoggedIn={() => { handleLoggedIn(navigation, location); }}
//         />
//       ),
//       navigationOptions: { header: null },
//     },
//   }, {
//     // Default config for all screens
//     initialRouteName: 'SplashScreen',
//     tabBarComponent: () => null,
//   }))
// );

// SplashNav.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
//   location: locationPropTypes.location,
// };

// SplashNav.defaultProps = {
//   location: null,
// };

// export default withLocation(SplashNav);
