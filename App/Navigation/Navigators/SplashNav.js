import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation';
import { withLocation, locationPropTypes } from '../../Context/Location';
import SplashScreen from '../../Screens/Splash/SplashScreen';
import LoggedOutRoute from '../LoggedOutRoute';
import AuthScreens from './AuthScreens';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const handleLoggedIn = (navigation, location) => {
  // In case the user is logged in when trying to access the SplashScreen,
  // redirect him to MainNav unless onboarding isn't completed yet.
  navigation.navigate(location ? 'MainNav' : 'OnboardingScreen');
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SplashNav = ({ location, navigation }) => (
  React.createElement(createStackNavigator({
    ...AuthScreens,
    SplashScreen: {
      screen: () => (
        <LoggedOutRoute
          navigation={navigation}
          component={SplashScreen}
          onLoggedIn={() => { handleLoggedIn(navigation, location); }}
        />
      ),
      navigationOptions: { header: null },
    },
  }, {
    // Default config for all screens
    initialRouteName: 'SplashScreen',
    tabBarComponent: () => null,
  }))
);

SplashNav.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  location: locationPropTypes.location,
};

SplashNav.defaultProps = {
  location: null,
};

export default withLocation(SplashNav);
