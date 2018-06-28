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

const { headerTitleStyle } = style;

const GameDetailsNav = StackNavigator({
  LoginScreen: {
    screen: ({ navigation }) => (
      <LoginScreen
        navigation={navigation}
        onSuccessHook={() => {
          // After success login, go back 2 screen:
          // --> ProfileSignupScreen
          // --> GameDetailsScreen
          navigation.pop(2);
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
        navigation={navigation}
        onSuccessHook={() => {
          // After success signup, go back 2 screen:
          // --> ProfileSignupScreen
          // --> GameDetailsScreen
          navigation.pop(2);
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
  ProfileSignupScreen: {
    screen: ProfileSignupScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Game details'),
      headerTitleStyle,
      headerLeft: (
        <StackBackHeader
          onPress={() => { navigation.goBack(null); }}
        />
      ),
    }),
  },
  GamePlayerScreen: {
    screen: PlayerList,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Player list'),
      headerTitleStyle,
      headerLeft: (
        <StackBackHeader
          onPress={() => { navigation.goBack(null); }}
        />
      ),
    }),
  },
  GameDetailsScreen: {
    screen: Game,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Game details'),
      headerTitleStyle,
      headerLeft: (
        <StackBackHeader
          onPress={() => { navigation.goBack(null); }}
        />
      ),
    }),
  },
}, {
  initialRouteName: 'GameDetailsScreen',
});

export default GameDetailsNav;
