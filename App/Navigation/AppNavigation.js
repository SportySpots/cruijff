import { StackNavigator } from 'react-navigation'

import FindGameScreen from '../Containers/Screens/FindGame'
import FindSpotScreen from '../Containers/Screens/FindSpot'
import LoginScreen from '../Containers/Screens/Login'
import ProfileScreen from '../Containers/Screens/Profile'

import styles from './Styles/NavigationStyles'

// Use this to either show the LoginScreen, or go straight to the SearchScreen
const userIsLoggedIn = false

// Manifest of possible screens
const AppNavigation = StackNavigator({
  FindGameScreen: { screen: FindGameScreen },
  FindSpotScreen: { screen: FindSpotScreen },
  LoginScreen: { screen: LoginScreen },
  ProfileScreen: { screen: ProfileScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: userIsLoggedIn ? 'FindSpotScreen' : 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default AppNavigation
