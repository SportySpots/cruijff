import React from 'react';
import { StackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import GamesListScreen from '../../Screens/Games/GamesListScreen';
import Game from '../../Screens/Games/GameDetailsScreen';
import ProfileSignupScreen from '../../Screens/Profile/ProfileSignupScreen';
import PlayerList from '../../Screens/Games/PlayerListScreen';
import style from './style';

const { headerTitleStyle } = style;

const GameSearchNav = StackNavigator({
  ProfileSignupScreen: {
    screen: ProfileSignupScreen,
    // TODO: pass onSuccessHook to ProfileSignupScreen to redirect user after
    // success login/signup
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
  GamesListScreen: {
    screen: GamesListScreen,
    navigationOptions: () => ({
      headerTitle: I18n.t('Find a game'),
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
}, {
  initialRouteName: 'GamesListScreen',
});

export default GameSearchNav;
