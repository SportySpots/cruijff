import React from 'react';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import LoggedOutRoute from '../LoggedOutRoute';
import LoginScreen from '../../Screens/Auth/LoginScreen';
import SignupScreen from '../../Screens/Auth/SignupScreen';
import SignupEmailScreen from '../../Screens/Auth/SignupEmailScreen';
import CheckEmailScreen from '../../Screens/Auth/CheckEmailScreen';
import LoggedOutScreen from '../../Screens/Auth/LoggedOutScreen';
import { headerTitleStyle } from './style';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const handleLoggedIn = (navigation) => {
  // In case the user is logged in when trying to access a logged out route,

  const authScreenNames = Object.keys(AuthScreens);

  // get this screens' parent Stack nav and the route names it contains.
  const parentNav = navigation.dangerouslyGetParent();
  const parentRoute = parentNav.state.routeName;

  if (parentRoute === 'SpotSearchTab') {
    navigation.navigate('SplashScreen');
  } else {
    const parentNavRoutes = parentNav.state.routes;
    const routeNames = parentNavRoutes.map(r => r.routeName);

    // number of items to pop equals number of AuthScreens in the stack.
    const numAuthRoutes = routeNames.filter(name => authScreenNames.indexOf(name) !== -1).length;
    parentNav.pop(numAuthRoutes);
  }
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
  LoginCheckEmailScreen: {
    screen: ({ navigation }) => (
      <LoggedOutRoute
        navigation={navigation}
        component={CheckEmailScreen}
        onLoggedIn={() => { handleLoggedIn(navigation); }}
        // Child component props
        action="login"
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
        onSuccessHook={() => { navigation.navigate('LoginCheckEmailScreen'); }}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('loginScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  SignupCheckEmailScreen: {
    screen: ({ navigation }) => (
      <LoggedOutRoute
        navigation={navigation}
        component={CheckEmailScreen}
        onLoggedIn={() => { handleLoggedIn(navigation); }}
        // Child component props
        action="signup"
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('checkEmailScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  SignupEmailScreen: {
    screen: ({ navigation }) => (
      <LoggedOutRoute
        navigation={navigation}
        component={SignupEmailScreen}
        onLoggedIn={() => { handleLoggedIn(navigation); }}
        // Child component props
        onSuccessHook={() => { navigation.navigate('SignupCheckEmailScreen'); }}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('signupEmailScreen.navigation.title'),
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
