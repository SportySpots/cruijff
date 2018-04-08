import { StackNavigator } from 'react-navigation'
import ProfileLoginScreen from '../Containers/ProfileLoginScreen'
import CardDetail from '../Components/SpotCards/CardDetail'
import SettingsScreen from '../Containers/SettingsScreen'
import ProfileDetailsScreen from '../Containers/ProfileDetailsScreen'
import ProfileEditScreen from '../Containers/ProfileEditScreen'
import I18n from '../I18n'
import SpotListScreen from '../Containers/SpotListScreen'

import Game from '../Components/Games/Game'
import GamesList from '../Components/Games/GamesList'
import SportAndTime from '../Components/Plan/SportAndTime'
import PickSpot from '../Components/Plan/PickSpot'
import Created from '../Components/Plan/Created'
import planWrapper from '../Containers/Plan/planWrapper'
import Description from '../Components/Plan/Description'

export const PlanGameNav = StackNavigator(
  {
    sportTime: {
      screen: planWrapper(SportAndTime)
    },
    pickSpot: {
      screen: planWrapper(PickSpot)
    },
    description: {
      screen: planWrapper(Description)
    },
    created: {
      screen: planWrapper(Created)
    }
  },
  {
    tabBarComponent: () => null,
    animationEnabled: true,
    headerMode: 'none',
    initialRouteName: 'sportTime'
  }
)

export const GameSearchNav = StackNavigator(
  {
    GameDetailsScreen: {
      screen: Game,
      navigationOptions: {
        title: 'Game Details'
      }
    },
    GameListScreen: {
      screen: GamesList,
      navigationOptions: {
        header: null
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
