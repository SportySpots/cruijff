import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import GameListScreen from '../Containers/GameListScreen'
import ProfileLoginScreen from '../Containers/ProfileLoginScreen'
// import SpotListScreen from '../Containers/SpotListScreen'
import CardDetail from '../Components/Cards/CardDetail'
import SettingsScreen from '../Containers/SettingsScreen'
import GamePlanScreen from '../Components/Plan'
// import SpotDetailsScreen from '../Containers/SpotDetailsScreen'
import GameDetailsScreen from '../Containers/GameDetailsScreen'
import ProfileDetailsScreen from '../Containers/ProfileDetailsScreen'
import ProfileEditScreen from '../Containers/ProfileEditScreen'
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'
import { View } from 'react-native'
import NavBar from '../Components/NavBar'
import I18n from '../I18n'
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

const SpotSearchNav = StackNavigator(
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
    // GamePlanTab: {
    //   screen: GamePlanScreen,
    //   navigationOptions: {
    //     header: null
    //   }
    // },
    ProfileTab: {
      screen: () => <ProfileNav />,
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
    tabBarComponent: () => null,
    animationEnabled: false,
    swipeEnabled: false
  }
)

/*
  MainScreen is basically a wrapper around DefaultNav, so that it contains a copy of the navigation state
  that can be passed as a prop to other children (NavBar). This provides more flexibility than just using
  tabBarComponent: NavBar
 */
export class MainScreen extends React.Component {
  constructor () {
    super()
    this.state = { navigation: null }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.navigation !== this.state.navigation
  }

  render () {
    console.log(this.state.navigation)
    return (
      <View style={{ flex: 1 }}>
        <DefaultNav
          {...this.props}
          ref={navigator => {
            if (navigator) {
              this.navigatorElement = navigator
              this.setState({ navigation: navigator._navigation })
            }
          }}
          onNavigationStateChange={() =>
            this.setState({ navigation: this.navigatorElement._navigation })
          }
        />
        <NavBar navigation={this.state.navigation} />
      </View>
    )
  }
}
