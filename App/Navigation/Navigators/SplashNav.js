import React from 'react';
import { AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import SplashScreen from '../../Screens/Splash/SplashScreen';
import LoggedOutRoute from '../LoggedOutRoute';
import AuthScreens from './AuthScreens';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const handleLoggedIn = async (navigation) => {
  // In case the user is logged in when trying to access the SplashScreen,
  // redirect him to MainNav unless onboarding isn't completed yet.
  let location = null;
  try {
    const locationJSON = await AsyncStorage.getItem('userLocation'); // { id, city, country, coords: { latitude, longitude } }
    if (locationJSON) {
      location = JSON.parse(locationJSON);
    }
  } catch (exc) {
    console.log(exc);
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
