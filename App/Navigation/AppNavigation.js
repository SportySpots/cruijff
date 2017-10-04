import { StackNavigator } from 'react-navigation'

import FindGameScreen from '../Containers/Screens/FindGame'
import FindSpotScreen from '../Containers/Screens/FindSpot'
import SplashScreen from '../Containers/Screens/Splash'
import ProfileScreen from '../Containers/Screens/Profile'

import styles from './Styles/NavigationStyles'

// Use this to either show the LoginScreen, or go straight to the SearchScreen
const userIsLoggedIn = false

// Manifest of possible screens
const AppNavigation = StackNavigator({
  FindGameScreen: { screen: FindGameScreen },
  FindSpotScreen: { screen: FindSpotScreen },
  SplashScreen: { screen: SplashScreen },
  ProfileScreen: { screen: ProfileScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: userIsLoggedIn ? 'FindSpotScreen' : 'SplashScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default AppNavigation
