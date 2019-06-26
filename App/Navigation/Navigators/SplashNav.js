import React from 'react';
import { createStackNavigator } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import SplashScreen from '../../Screens/Splash/SplashScreen';
import LoggedOutRoute from '../LoggedOutRoute';
import AuthScreens from './AuthScreens';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const handleLoggedIn = (navigation) => {
  // In case the user is logged in when trying to access the SplashScreen,
  // redirect him to MainNav unless onboarding isn't completed yet.
  AsyncStorage.getItem('userCity').then((city) => {
    navigation.navigate(city ? 'MainNav' : 'OnboardingScreen');
  });
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
