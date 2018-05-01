import { StackNavigator, SwitchNavigator } from 'react-navigation'
import ProfileLoginScreen from '../Components/Profile/ProfileLoginScreen'
import SpotDetail from '../Components/Spots/Spot'
import SettingsScreen from '../Components/SettingsScreen'
import ProfileDetailsScreen from '../Components/Profile/ProfileDetailsScreen'
import ProfileEditScreen from '../Components/Profile/ProfileEditScreen'
import I18n from '../I18n'
import SpotList from '../Components/Spots/SpotList'

import Game from '../Components/Games/Game'
import GamesList from '../Components/Games/GameList'
import SportAndTime from '../Components/Plan/SportAndTime'
import PickSpot from '../Components/Plan/PickSpot'
import Created from '../Components/Plan/Created'
import planWrapper from '../Containers/Plan/planWrapper'
import Description from '../Components/Plan/Description'
import PlayerList from '../Components/Games/PlayerList'

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
        title: I18n.t('Game Details')
      }
    },
    GameListScreen: {
      screen: GamesList,
      navigationOptions: {
        header: null
      }
    },
    GamePlayerScreen: {
      screen: PlayerList,
      navigationOptions: {
        title: I18n.t('Players')
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
      screen: SpotDetail,
      navigationOptions: {
        title: I18n.t('spot-details')
      }
    },
    SpotListScreen: {
      screen: SpotList,
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

const LoggedInProfileNav = StackNavigator(
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
    }
  },
  {
    initialRouteName: 'ProfileDetailsScreen'
  }
)

export const ProfileNav = SwitchNavigator(
  {
    ProfileLoginScreen: {
      screen: ProfileLoginScreen
    },
    LoggedInProfileNav: {
      screen: LoggedInProfileNav
    }
  },
  {
    initialRouteName: 'ProfileLoginScreen'
  }
)
