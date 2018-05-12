import React from 'react';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import ProfileSignupScreen from '../Screens/Profile/ProfileSignupScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import ProfileDetailsScreen from '../Screens/Profile/ProfileDetailsScreen';
import ProfileEditScreen from '../Screens/Profile/ProfileEditScreen';
import I18n from '../I18n';
import SpotsListScreen from '../Screens/Spots/SpotsListScreen';
import SpotsMapScreen from '../Screens/Spots/SpotsMapScreen';
import SpotDetailsScreen from '../Screens/Spots/SpotDetailsScreen';

import Game from '../Screens/Games/GameDetailsScreen';
import GamesList from '../Screens/Games/GameListScreen';
import SportAndTime from '../Screens/Plan/SportAndTimeScreen';
import PickSpot from '../Screens/Plan/PickSpotScreen';
import Created from '../Screens/Plan/CreatedScreen';
import planWrapper from '../Containers/Plan/planWrapper';
import Description from '../Screens/Plan/DescriptionScreen';
import PlayerList from '../Screens/Games/PlayerListScreen';
import Text from '../Components/Text';
import { TouchableOpacity } from 'react-native';

export const PlanGameNav = StackNavigator(
  {
    sportTime: {
      screen: planWrapper(SportAndTime),
    },
    pickSpot: {
      screen: planWrapper(PickSpot),
    },
    description: {
      screen: planWrapper(Description),
    },
    created: {
      screen: planWrapper(Created),
    },
  },
  {
    tabBarComponent: () => null,
    animationEnabled: true,
    headerMode: 'none',
    initialRouteName: 'sportTime',
  },
);

export const GameSearchNav = StackNavigator(
  {
    GameDetailsScreen: {
      screen: Game,
      navigationOptions: {
        title: I18n.t('Game Details'),
      },
    },
    GameListScreen: {
      screen: GamesList,
      navigationOptions: {
        header: null,
      },
    },
    GamePlayerScreen: {
      screen: PlayerList,
      navigationOptions: {
        title: I18n.t('Players'),
      },
    },
  },
  {
    initialRouteName: 'GameListScreen',
  },
);

export const SpotSearchNav = StackNavigator(
  {
    SpotDetailsScreen: {
      screen: SpotDetailsScreen,
      navigationOptions: {
        title: I18n.t('spot-details'),
      },
    },
    SpotsListScreen: {
      screen: SpotsListScreen,
      navigationOptions: {
        header: null,
      },
    },
    SpotsMapScreen: {
      screen: SpotsMapScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    // initialRouteName: 'SpotsListScreen',
    initialRouteName: 'SpotsMapScreen',
  },
);

export const SettingsNav = StackNavigator(
  {
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings',
      },
    },
  },
  {
    initialRouteName: 'SettingsScreen',
  },
);

const LoggedInProfileNav = StackNavigator(
  {
    ProfileDetailsScreen: {
      screen: ProfileDetailsScreen,
      navigationOptions: {
        header: null,
      },
    },
    ProfileEditScreen: {
      screen: ProfileEditScreen,
    },
  },
  {
    initialRouteName: 'ProfileDetailsScreen',
  },
);

export const ProfileNav = SwitchNavigator(
  {
    ProfileSignupScreen: {
      screen: ProfileSignupScreen,
    },
    LoggedInProfileNav: {
      screen: LoggedInProfileNav,
    },
  },
  {
    initialRouteName: 'ProfileSignupScreen',
  },
);
