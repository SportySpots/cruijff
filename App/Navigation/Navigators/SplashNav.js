import React from 'react';
import { StackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import LoginScreen from '../../Screens/LoginScreen';
import SignupScreen from '../../Screens/SignupScreen';
import SplashScreen from '../../Screens/SplashScreen';
import { headerTitleStyle } from './style';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const handleSuccessAuth = (navigation) => {
  // After successful auth, go back to splash screen
  navigation.goBack(null);
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
const SplashNav = StackNavigator({
  LoginScreen: {
    screen: ({ navigation }) => (
      <LoginScreen
        navigation={navigation}
        onSuccessHook={() => { handleSuccessAuth(navigation); }}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Hi again!'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  SignupScreen: {
    screen: ({ navigation }) => (
      <SignupScreen
        navigation={navigation}
        onSuccessHook={() => { handleSuccessAuth(navigation); }}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Sign up'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: { header: null },
  },
}, {
  // Default config for all screens
  initialRouteName: 'SplashScreen',
  tabBarComponent: () => null,
});

export default SplashNav;
