import React from 'react'
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'

import styles from './Styles/NavigationStyles'
import SplashScreen from '../Containers/SplashScreen'
import GameDetailsScreen from '../Containers/GameDetailsScreen'
import GameListScreen from '../Containers/GameListScreen'
import GamePlanScreen from '../Containers/GamePlanScreen'
import LocationPermissionScreen from '../Containers/LocationPermissionScreen'
import OnboardingScreen from '../Containers/OnboardingScreen'
import ProfileDetailsScreen from '../Containers/ProfileDetailsScreen'
import ProfileEditScreen from '../Containers/ProfileEditScreen'
import ProfileLoginScreen from '../Containers/ProfileLoginScreen'
import SettingsScreen from '../Containers/SettingsScreen'
import SpotDetailsScreen from '../Containers/SpotDetailsScreen'
import SpotListScreen from '../Containers/SpotListScreen'

const GameSearchNav = StackNavigator(
  {
    GameDetailsScreen: {
      screen: GameDetailsScreen,
      navigationOptions: {
        title: 'Game Details'
      }
    },
    GameListScreen: {
      screen: GameListScreen,
      navigationOptions: {
        title: 'Games'
      }
    }
  },
  {
    initialRouteName: 'GameListScreen'
  }
)

const GamePlanNav = StackNavigator(
  {
    GamePlanScreen: {
      screen: GamePlanScreen,
      navigationOptions: {
        title: 'Plan Game'
      }
    }
  },
  {
    initialRouteName: 'GamePlanScreen'
  }
)

const SpotSearchNav = StackNavigator(
  {
    SpotDetailsScreen: {
      screen: SpotDetailsScreen,
      navigationOptions: {
        title: 'Spot Details'
      }
    },
    SpotListScreen: {
      screen: SpotListScreen,
      navigationOptions: {
        title: 'Spots'
      }
    }
  },
  {
    initialRouteName: 'SpotListScreen'
  }
)

const SettingsNav = StackNavigator(
  {
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings'
      }
    }
  },
  {
    initialRouteName: 'SettingsScreen'
  }
)

const ProfileNav = StackNavigator(
  {
    ProfileDetailsScreen: {
      screen: ProfileDetailsScreen,
      navigationOptions: {
        title: 'Profile Details'
      }
    },
    ProfileEditScreen: {
      screen: ProfileEditScreen,
      navigationOptions: {
        title: 'Profile Edit'
      }
    },
    ProfileLoginScreen: {
      screen: ProfileLoginScreen,
      navigationOptions: {
        title: 'Signup/ Login'
      }
    }
  },
  {
    initialRouteName: 'ProfileLoginScreen'
  }
)

const DefaultNav = TabNavigator(
  {
    SpotSearchTab: {
      screen: SpotSearchNav,
      navigationOptions: {
        title: 'Spots'
      }
    },
    GameJoinTab: {
      screen: GameSearchNav,
      navigationOptions: {
        title: 'Join Game'
      }
    },
    GamePlanTab: {
      screen: GamePlanNav,
      navigationOptions: {
        title: 'Plan Game'
      }
    },
    ProfileTab: {
      screen: ProfileNav,
      navigationOptions: {
        title: 'Profile'
      }
    },
    SettingsTab: {
      screen: SettingsNav,
      navigationOptions: {
        title: 'Settings'
      }
    }
  },
  {
    initialRouteName: 'SpotSearchTab',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === 'SpotSearchTab') {
          iconName = 'map-marker'
        } else if (routeName === 'GameJoinTab') {
          iconName = 'account-plus'
        } else if (routeName === 'GamePlanTab') {
          iconName = 'soccer'
        } else if (routeName === 'ProfileTab') {
          iconName = 'account-circle'
        } else if (routeName === 'SettingsTab') {
          iconName = 'settings'
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />
      }
    }),
    tabBarOptions: {
      activeTintColor: 'green',
      inactiveTintColor: 'gray'
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
  }
)

const RootNav = StackNavigator(
  {
    LocationPermissionScreen: { screen: LocationPermissionScreen },
    OnboardingScreen: { screen: OnboardingScreen },
    SplashScreen: { screen: SplashScreen },
    DefaultNav: { screen: DefaultNav }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'SplashScreen',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
)

export default RootNav
