import React from 'react';
import { Alert, Keyboard } from 'react-native';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import LoginScreen from '../../Screens/LoginScreen';
import SignupScreen from '../../Screens/SignupScreen';
import ProfileSignupScreen from '../../Screens/Profile/ProfileSignupScreen';
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
const handleSuccessAuth = (navigation) => {
  // After successful auth, go back 2 screens:
  // --> ProfileSignupScreen --> GameDetailsScreen
  navigation.pop(2);
};
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
