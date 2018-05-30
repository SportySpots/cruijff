import React from 'react';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import { View } from 'react-native';
import I18n from '../I18n';
import Text from '../Components/Text';
import StackBackHeader from '../Components/StackBackHeader';
import ProfileSignupScreen from '../Screens/Profile/ProfileSignupScreen';
import InfoScreen from '../Screens/InfoScreen';
import ProfileDetailsScreen from '../Screens/Profile/ProfileDetailsScreen';
import ProfileEditScreen from '../Screens/Profile/ProfileEditScreen';
import SpotsListScreen from '../Screens/Spots/SpotsListScreen';
import SpotDetailsScreen from '../Screens/Spots/SpotDetailsScreen';
// import SpotsMapScreen from '../Screens/Spots/SpotsMapScreen';
// import SpotsHeaderBtn from '../Components/Spots/HeaderBtn';
import planWrapper from '../Containers/Plan/planWrapper';
import Game from '../Screens/Games/GameDetailsScreen';
import GamesList from '../Screens/Games/GameListScreen';
import Created from '../Screens/Plan/CreatedScreen';
import Description from '../Screens/Plan/DescriptionScreen';
import PlayerList from '../Screens/Games/PlayerListScreen';
import PickSpot from '../Screens/Plan/PickSpotScreen';
import SportAndTime from '../Screens/Plan/SportAndTimeScreen';

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
      navigationOptions({ navigation }) {
        return {
          header: () => (
            <StackBackHeader
              title={I18n.t('Game details')}
              onPress={() => { navigation.goBack(null); }}
            />
          ),
        };
      },
    },
    GameListScreen: {
      screen: GamesList,
      navigationOptions({ navigation }) { // eslint-disable-line
        return {
          headerLeft: (
            <View style={{ marginLeft: 16 }}>
              <Text.M>{I18n.t('Find a game')}</Text.M>
            </View>
          ),
        };
      },
    },
    GamePlayerScreen: {
      screen: PlayerList,
      navigationOptions({ navigation }) {
        return {
          header: () => (
            <StackBackHeader
              title={I18n.t('Player list')}
              onPress={() => { navigation.goBack(null); }}
            />
          ),
        };
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
      navigationOptions({ navigation }) {
        return {
          header: () => (
            <StackBackHeader
              title={I18n.t('Spot details')}
              onPress={() => { navigation.goBack(null); }}
            />
          ),
        };
      },
    },
    /* SpotsMapScreen: {
      screen: SpotsMapScreen,
      navigationOptions({ navigation }) {
        return {
          headerLeft: (
            <View style={{ marginLeft: 8 }}><Text.M>{I18n.t('Find a spot')}</Text.M></View>
          ),
          headerRight: (
            <SpotsHeaderBtn
              icon="dehaze"
              onPress={() => { navigation.goBack(null); }}
            />
          ),
          tabBarVisible: false,
        };
      },
    }, */
    SpotsListScreen: {
      screen: SpotsListScreen,
      navigationOptions({ navigation }) { // eslint-disable-line
        return {
          headerLeft: (
            <View style={{ marginLeft: 16 }}>
              <Text.M>{I18n.t('Find a spot')}</Text.M>
            </View>
          ),
          /* headerRight: (
            <SpotsHeaderBtn
              icon="location-on"
              onPress={() => { navigation.navigate('SpotsMapScreen'); }}
            />
          ), */
        };
      },
    },
  },
  {
    initialRouteName: 'SpotsListScreen',
  },
);

export const InfoNav = StackNavigator(
  {
    InfoScreen: {
      screen: InfoScreen,
      navigationOptions: {
        title: I18n.t('Info'),
      },
    },
  },
  {
    initialRouteName: 'InfoScreen',
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
      navigationOptions({ navigation }) {
        return {
          header: () => (
            <StackBackHeader
              title={I18n.t('Profile Edit')}
              onPress={() => { navigation.goBack(null); }}
            />
          ),
        };
      },
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
