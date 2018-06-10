import React from 'react';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
// import { View } from 'react-native';
import I18n from '../I18n';
// import Text from '../Components/Text';
import StackBackHeader from './StackBackHeader';
import ProfileSignupScreen from '../Screens/Profile/ProfileSignupScreen';
import InfoScreen from '../Screens/InfoScreen';
import ProfileDetailsScreen from '../Screens/Profile/ProfileDetailsScreen';
import ProfileEditScreen from '../Screens/Profile/ProfileEditScreen';
import SpotsListScreen from '../Screens/Spots/SpotsListScreen';
import SpotDetailsScreen from '../Screens/Spots/SpotDetailsScreen';
// import SpotsMapScreen from '../Screens/Spots/SpotsMapScreen';
import SpotsHeaderBtn from '../Components/Spots/HeaderBtn';
import planWrapper from '../Containers/Plan/planWrapper';
import Game from '../Screens/Games/GameDetailsScreen';
import GamesListScreen from '../Screens/Games/GamesListScreen';
import Created from '../Screens/Plan/CreatedScreen';
import Description from '../Screens/Plan/DescriptionScreen';
import PlayerList from '../Screens/Games/PlayerListScreen';
import PickSpot from '../Screens/Plan/PickSpotScreen';
import SportAndTime from '../Screens/Plan/SportAndTimeScreen';
// import DefaultHeader from './DefaultHeader';
import SpotFilterScreen from '../Screens/Spots/SpotsFilterScreen';

const headerTitleStyle = {
  alignSelf: 'center',
  textAlign: 'center',
};


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
          headerTitle: I18n.t('Game details'),
          headerTitleStyle,
          headerLeft: (
            <StackBackHeader
              onPress={() => { navigation.goBack(null); }}
            />
          ),
        };
      },
    },
    GameListScreen: {
      screen: GamesListScreen,
      navigationOptions: () => ({
        // headerLeft: <DefaultHeader title={I18n.t('Find a game')} />,
        headerTitle: I18n.t('Find a game'),
      }),
    },
    GamePlayerScreen: {
      screen: PlayerList,
      navigationOptions({ navigation }) {
        return {
          headerTitle: I18n.t('Player list'),
          headerTitleStyle,
          headerLeft: (
            <StackBackHeader
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
          headerTitle: I18n.t('Spot details'),
          headerTitleStyle,
          headerLeft: (
            <StackBackHeader
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
      navigationOptions: ({ navigation }) => ({
        headerTitle: I18n.t('Find a spot'),
        headerRight: (
          <SpotsHeaderBtn
            icon="filter-list"
            onPress={() => { navigation.navigate('SpotsFilterScreen'); }}
          />
        ),
      /* navigationOptions: () => ({
        headerTitle: I18n.t('Find a spot'),
        // headerLeft: <DefaultHeader title={I18n.t('Find a spot')} />,
        headerRight: (
            <SpotsHeaderBtn
              icon="location-on"
              onPress={() => { navigation.navigate('SpotsMapScreen'); }}
            />
        ), */
      }),
    },
    SpotsFilterScreen: {
      screen: SpotFilterScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () => (
          <StackBackHeader
            title={I18n.t('Spot filters')}
            onPress={() => { navigation.goBack(null); }}
          />
        ),
      }),
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
      navigationOptions: () => ({
        headerTitle: I18n.t('Info'),
        // headerLeft: <DefaultHeader title={I18n.t('Info')} />,
      }),
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
      navigationOptions: () => ({
        headerTitle: I18n.t('Profile'),
        // headerLeft: <DefaultHeader title={I18n.t('Profile')} />,
      }),
    },
    ProfileEditScreen: {
      screen: ProfileEditScreen,
      navigationOptions({ navigation }) {
        return {
          headerTitle: I18n.t('Profile Edit'),
          headerTitleStyle,
          headerLeft: (
            <StackBackHeader
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
      screen: StackNavigator(
        {
          profileScreen: {
            screen: ProfileSignupScreen,
            navigationOptions: () => ({
              headerTitle: I18n.t('Profile'),
              // headerLeft: <DefaultHeader title={I18n.t('Profile')} />,
            }),
          },
        },
        {
          initialRouteName: 'profileScreen',
        },
      ),
    },
    LoggedInProfileNav: {
      screen: LoggedInProfileNav,
    },
  },
  {
    initialRouteName: 'ProfileSignupScreen',
  },
);
