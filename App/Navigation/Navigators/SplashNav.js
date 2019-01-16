import React from 'react';
import { createStackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import SplashScreen from '../../Screens/SplashScreen';
import LoginScreen from '../../Screens/Auth/LoginScreen';
import CheckEmailScreen from '../../Screens/Auth/CheckEmailScreen';
import StackBackHeader from '../StackBackHeader';
import LoggedOutRoute from '../LoggedOutRoute';
import { headerTitleStyle } from './style';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const handleLoggedIn = (navigation) => {
  // In case the user is logged in when trying to access a logged out route,
  // redirect to MainNav
  navigation.navigate('MainNav');
};
//------------------------------------------------------------------------------
const backBtn = navigation => (
  <StackBackHeader
    onPress={() => { navigation.goBack(null); }}
  />
);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SplashNav = createStackNavigator({
  CheckEmailScreen: {
    screen: ({ navigation }) => (
      <LoggedOutRoute
        navigation={navigation}
        component={() => (<CheckEmailScreen action="login" />)}
        onLoggedIn={() => { handleLoggedIn(navigation); }}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('checkEmailScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  LoginScreen: {
    screen: ({ navigation }) => (
      <LoggedOutRoute
        navigation={navigation}
        component={LoginScreen}
        onLoggedIn={() => { handleLoggedIn(navigation); }}
        // Child component props
        onSuccessHook={() => { navigation.navigate('CheckEmailScreen'); }}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('loginScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
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


/*
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import SplashScreen from '../../Screens/SplashScreen';
import LoginScreen from '../../Screens/Auth/LoginScreen';
import LoginEmailScreen from '../../Screens/Auth/LoginEmailScreen';
import StackBackHeader from '../StackBackHeader';
import LoggedOutRoute from '../LoggedOutRoute';
import { headerTitleStyle } from './style';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const handleLoggedIn = (navigation) => {
  // In case the user is logged in when trying to access a logged out route,
  // redirect to MainNav
  navigation.navigate('MainNav');
};
//------------------------------------------------------------------------------
const handleSuccessAuth = (navigation) => {
  // After successful auth, go back 3 screens:
  // --> LoginEmailScreen --> LoginEmailScreen --> MainNave
  navigation.pop(2);
  navigation.navigate('MainNav');
};
//------------------------------------------------------------------------------
const backBtn = navigation => (
  <StackBackHeader
    onPress={() => { navigation.goBack(null); }}
  />
);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SplashNav = createStackNavigator({
  LoginEmailScreen: {
    screen: ({ navigation }) => (
      <LoggedOutRoute
        navigation={navigation}
        component={LoginEmailScreen}
        onLoggedIn={() => { handleLoggedIn(navigation); }}
        // Child component props
        onSuccessHook={() => { handleSuccessAuth(navigation); }}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('loginEmailScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  LoginScreen: {
    screen: ({ navigation }) => (
      <LoggedOutRoute
        navigation={navigation}
        component={LoginScreen}
        onLoggedIn={() => { handleLoggedIn(navigation); }}
        // Child component props
        onSuccessHook={() => {}}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('loginScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
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

*/