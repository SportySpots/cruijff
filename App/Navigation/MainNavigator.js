import { StackNavigator } from 'react-navigation'
import GameListScreen from '../Containers/GameListScreen'
import ProfileLoginScreen from '../Containers/ProfileLoginScreen'
import CardDetail from '../Components/SpotCards/CardDetail'
import SettingsScreen from '../Containers/SettingsScreen'
import GameDetailsScreen from '../Containers/GameDetailsScreen'
import ProfileDetailsScreen from '../Containers/ProfileDetailsScreen'
import ProfileEditScreen from '../Containers/ProfileEditScreen'
import I18n from '../I18n'
import SpotListScreen from '../Containers/SpotListScreen'

export const GameSearchNav = StackNavigator(
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

export const SpotSearchNav = StackNavigator(
  {
    SpotDetailsScreen: {
      screen: CardDetail,
      navigationOptions: {
        title: I18n.t('spot-details')
      }
    },
    SpotListScreen: {
      screen: SpotListScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'SpotListScreen'
  }
)

export const SettingsNav = StackNavigator(
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

export const ProfileNav = StackNavigator(
  {
    ProfileDetailsScreen: {
      screen: ProfileDetailsScreen,
      navigationOptions: {
        header: null
      }
    },
    ProfileEditScreen: {
      screen: ProfileEditScreen,
      navigationOptions: {
        title: I18n.t('Profile Edit')
      }
    },
    ProfileLoginScreen: {
      screen: ProfileLoginScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'ProfileDetailsScreen'
  }
)
