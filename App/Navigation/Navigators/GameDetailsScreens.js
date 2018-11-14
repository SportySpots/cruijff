import React from 'react';
import { Alert, Keyboard } from 'react-native';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import GameDetailsScreen from '../../Screens/Games/GameDetailsScreen';
import CancelGameScreen from '../../Screens/Games/CancelGameScreen';
import EditGameScreen from '../../Screens/Games/EditGameScreen';
import SpotDetailsScreen from '../../Screens/Spots/SpotDetailsScreen';
import PlayerList from '../../Screens/Games/PlayersListScreen';
import AdminMenu from '../../Components/Games/AdminMenu';
import { headerTitleStyle } from './style';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const handleEditGameLeave = (navigation) => {
  Keyboard.dismiss();

  Alert.alert(
    I18n.t('Confirm'),
    I18n.t('Are you sure you want to leave the edition?'),
    [
      { text: I18n.t('No'), onPress: () => null, style: 'cancel' },
      { text: I18n.t('Yes'), onPress: () => { navigation.goBack(null); } },
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
      headerTitle: I18n.t('Spot details'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  CancelGameScreen: {
    screen: CancelGameScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Cancel activity'),
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
      headerTitle: I18n.t('Edit activity'),
      headerTitleStyle,
      headerLeft: backBtnConfirm(navigation),
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
    screen: GameDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Game details'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
      headerRight: <AdminMenu navigation={navigation} />,
    }),
  },
};

export default GameDetailsScreens;
