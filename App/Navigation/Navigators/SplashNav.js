import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { withUser, userPropTypes } from '../../Context/User';
import SplashScreen from '../../Screens/Splash/SplashScreen';
import LoggedOutRoute from '../LoggedOutRoute';
import AuthScreens from './AuthScreens';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const handleLoggedIn = (navigation, onboarded) => {
  // In case the user is logged in when trying to access the SplashScreen,
  // redirect him to MainNav unless onboarding isn't completed yet.
  navigation.navigate(onboarded ? 'MainNav' : 'OnboardingScreen');
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SplashNav = ({ onboarded, navigation }) => (
  React.createElement(createStackNavigator({
    ...AuthScreens,
    SplashScreen: {
      screen: () => (
        <LoggedOutRoute
          navigation={navigation}
          component={SplashScreen}
          onLoggedIn={() => { handleLoggedIn(navigation, onboarded); }}
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
  onboarded: userPropTypes.onboarded.isRequired,
}

export default withUser(SplashNav);
