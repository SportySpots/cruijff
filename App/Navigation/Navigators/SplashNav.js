import React from 'react';
import { StackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import LoginScreen from '../../Screens/LoginScreen';
import SignupScreen from '../../Screens/SignupScreen';
import SplashScreen from '../../Screens/SplashScreen';
import style from './style';

const { headerTitleStyle } = style;

const SplashNav = StackNavigator({
  LoginScreen: {
    screen: ({ navigation }) => (
      <LoginScreen
        onSuccessHook={() => {
          // After success login, go back to splash screen
          navigation.goBack(null);
        }}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Hi again!'),
      headerTitleStyle,
      headerLeft: (
        <StackBackHeader
          onPress={() => { navigation.goBack(null); }}
        />
      ),
    }),
  },
  SignupScreen: {
    screen: ({ navigation }) => (
      <SignupScreen
        onSuccessHook={() => {
          // After success signup, go back to splash screen
          navigation.goBack(null);
        }}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Sign up'),
      headerTitleStyle,
      headerLeft: (
        <StackBackHeader
          onPress={() => { navigation.goBack(null); }}
        />
      ),
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
