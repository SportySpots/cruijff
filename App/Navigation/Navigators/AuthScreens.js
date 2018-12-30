import React from 'react';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import LoggedOutRoute from '../LoggedOutRoute';
import LoginScreen from '../../Screens/Auth/LoginScreen';
import SignupScreen from '../../Screens/Auth/SignupScreen';
import LoggedOutScreen from '../../Screens/Auth/LoggedOutScreen';
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
  // After successful auth, go back 2 screens:
  // --> LoggedOutScreen --> <Original>Screen
  navigation.pop(2);
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
const AuthScreens = {
  LoginScreen: {
    screen: ({ navigation }) => (
      <LoggedOutRoute
        navigation={navigation}
        component={LoginScreen}
        onLoggedIn={() => { handleLoggedIn(navigation); }}
        // Child component props
        onSuccessHook={() => { handleSuccessAuth(navigation); }}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('loginScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  SignupScreen: {
    screen: ({ navigation }) => (
      <LoggedOutRoute
        navigation={navigation}
        component={SignupScreen}
        onLoggedIn={() => { handleLoggedIn(navigation); }}
        // Child component props
        onSuccessHook={() => { handleSuccessAuth(navigation); }}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('signupScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  LoggedOutScreen: {
    screen: ({ navigation }) => (
      <LoggedOutRoute
        navigation={navigation}
        component={LoggedOutScreen}
        onLoggedIn={() => { handleLoggedIn(navigation); }}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('loggedOutScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
};

export default AuthScreens;
