import { StackNavigator } from 'react-navigation'
import LoginScreen from '../Containers/LoginScreen'
import SearchScreen from '../Containers/SearchScreen'

import styles from './Styles/NavigationStyles'

// Use this to either show the LoginScreen, or go straight to the SearchScreen
const userIsLoggedIn = true;

// Manifest of possible screens
const AppNavigation = StackNavigator({
  LoginScreen: { screen: LoginScreen },
  SearchScreen: { screen: SearchScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: userIsLoggedIn ? 'SearchScreen' : 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default AppNavigation
