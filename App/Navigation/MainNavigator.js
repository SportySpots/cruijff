import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import GameListScreen from '../Containers/GameListScreen'
import ProfileLoginScreen from '../Containers/ProfileLoginScreen'
// import SpotListScreen from '../Containers/SpotListScreen'
import CardList from '../Components/Cards/CardList'
import CardDetail from '../Components/Cards/CardDetail'
import SettingsScreen from '../Containers/SettingsScreen'
import GamePlanScreen from '../Containers/GamePlanScreen'
// import SpotDetailsScreen from '../Containers/SpotDetailsScreen'
import GameDetailsScreen from '../Containers/GameDetailsScreen'
import ProfileDetailsScreen from '../Containers/ProfileDetailsScreen'
import ProfileEditScreen from '../Containers/ProfileEditScreen'
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'
import { View } from 'react-native'
import NavBar from '../Components/NavBar'
import I18n from '../I18n'

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
      screen: CardDetail,
      navigationOptions: {
        title: I18n.t('spot-details')
      }
    },
    SpotListScreen: {
      screen: CardList,
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
    return (
      <View style={{ flex: 1 }}>
        <DefaultNav
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
