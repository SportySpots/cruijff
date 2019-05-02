import React from 'react';
import { Alert, Keyboard } from 'react-native';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import GameDetailsScreen from '../../Screens/Games/GameDetailsScreen';
import CancelGameScreen from '../../Screens/Games/CancelGameScreen';
import EditGameScreen from '../../Screens/Games/EditGameScreen';
import SpotDetailsScreen from '../../Screens/Spots/SpotDetailsScreen';
import GameChatScreen from '../../Screens/Games/GameChatScreen';
import PlayersListScreen from '../../Screens/Games/PlayersListScreen';
import AdminMenu from '../../Components/Games/AdminMenu';
import { headerTitleStyle } from './style';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const handleEditGameLeave = (navigation) => {
  Keyboard.dismiss();

  Alert.alert(
    I18n.t('cancelGameScreen.leaveAlert.header'),
    I18n.t('cancelGameScreen.leaveAlert.body'),
    [
      {
        text: I18n.t('cancelGameScreen.leaveAlert.footer.cancelBtnLabel'),
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: I18n.t('cancelGameScreen.leaveAlert.footer.okBtnLabel'),
        onPress: () => { navigation.goBack(null); },
      },
    ],
  );
};
//------------------------------------------------------------------------------
const backBtn = navigation => (
  <StackBackHeader
    onPress={() => { navigation.goBack(null); }}
  />
);
//------------------------------------------------------------------------------
const backBtnConfirm = navigation => (
  <StackBackHeader
    onPress={() => {
      handleEditGameLeave(navigation);
    }}
  />
);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GameDetailsScreens = {
  SpotDetailsScreen: {
    screen: SpotDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('spotDetailsScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  CancelGameScreen: {
    screen: CancelGameScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('cancelGameScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  EditGameScreen: {
    screen: ({ navigation }) => (
      <EditGameScreen
        navigation={navigation}
        onLeave={() => { handleEditGameLeave(navigation); }}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('editGameScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: backBtnConfirm(navigation),
    }),
  },
  GamePlayersScreen: {
    screen: PlayersListScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('playersListScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  GameChatScreen: {
    screen: GameChatScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('gameChatScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  GameDetailsScreen: {
    screen: GameDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('gameDetailsScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
      headerRight: <AdminMenu navigation={navigation} />,
    }),
  },
};

export default GameDetailsScreens;
