import React from 'react';
import { StackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import LoginScreen from '../../Screens/LoginScreen';
import SignupScreen from '../../Screens/SignupScreen';
import Game from '../../Screens/Games/GameDetailsScreen';
import ProfileSignupScreen from '../../Screens/Profile/ProfileSignupScreen';
import PlayerList from '../../Screens/Games/PlayerListScreen';
import style from './style';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const { headerTitleStyle } = style;
//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const handleSuccessAuth = (navigation) => {
  // After successful auth, go back 2 screens:
  // --> ProfileSignupScreen --> GameDetailsScreen
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
const GameDetailsNav = StackNavigator({
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
  ProfileSignupScreen: {
    screen: ProfileSignupScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Game details'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  GamePlayerScreen: {
    screen: PlayerList,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Player list'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  GameDetailsScreen: {
    screen: Game,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Game details'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
}, {
  initialRouteName: 'GameDetailsScreen',
});

export default GameDetailsNav;
