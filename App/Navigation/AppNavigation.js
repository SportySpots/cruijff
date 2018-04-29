import React from 'react'
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation'

import SplashScreen from '../Components/SplashScreen'
import OnboardingScreen from '../Components/Onboarding'
import {
  GameSearchNav,
  PlanGameNav,
  ProfileNav,
  SettingsNav,
  SpotSearchNav
} from './Navigators'
import AskLocation from '../Components/AskLocation'
import SignupScreen from '../Components/Signup'
import { View } from 'react-native'
import NavBar from '../Components/NavBar'

/*
  Stack Navigator has support for a (custom) NavBar,
  We can't use it since our NavBar has the center button
  partly overlapping the View above it
 */
const withNavBar = Navigator => {
  const navigator = props => (
    <View style={{ flex: 1 }}>
      <Navigator {...props} />
      <NavBar {...props} />
    </View>
  )
  navigator.router = Navigator.router
  return navigator
}

export const MainTabsNav = withNavBar(
  SwitchNavigator(
    {
      SpotSearchTab: { screen: SpotSearchNav },
      GameSearchTab: { screen: GameSearchNav },
      ProfileTab: { screen: ProfileNav },
      SettingsTab: { screen: SettingsNav }
    },
    {
      tabBarComponent: () => null,
      initialRouteName: 'SpotSearchTab'
    }
  )
)

export const MainNav = StackNavigator(
  {
    MainTabs: { screen: MainTabsNav },
    PlanScreen: { screen: PlanGameNav },
    StackSignupScreen: {
      screen: SignupScreen
    }
  },
  {
    initialRouteName: 'MainTabs',
    headerMode: 'none'
  }
)

/* Be careful using StackNavigator, it is really a stack
   in the sense that all screens stay mounted if navigating
   to a new screen (unless they are explicitly removed from history).

   That is why SwitchNavigator is here, even though it doesn't have a
   tranisition animation.
 */
export const RootNav = ({ initialRouteName }) =>
  React.createElement(
    SwitchNavigator(
      {
        LocationPermissionScreen: { screen: AskLocation },
        OnboardingScreen: { screen: OnboardingScreen },
        SplashScreen: { screen: SplashScreen },
        SignupScreen: { screen: SignupScreen },
        MainNav: { screen: MainNav }
      },
      {
        // Default config for all screens
        headerMode: 'none',
        initialRouteName: initialRouteName,
        tabBarComponent: () => null
      }
    )
  )

export default RootNav

// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InRvbXRvbSIsImV4cCI6MTUyNDU3NTcyOSwiZW1haWwiOiJ0b21rbGF2KzQ0NEBnbWFpbC5jb20ifQ.VeJT14HctWeWIFWatX9yrzeyIJgD75vGXmAwflAHodY
