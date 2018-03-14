import React from 'react'
import ReactNavigation, { StackNavigator } from 'react-navigation'

import SplashScreen from '../Containers/SplashScreen'
import OnboardingScreen from '../Components/Onboarding'
import {
  GameSearchNav,
  ProfileNav,
  SettingsNav,
  SpotSearchNav
} from './MainNavigator'
import AskLocation from '../Containers/AskLocation'
import { connect } from 'react-redux'
import GamePlanScreen from '../Components/Plan'
import SignupScreen from '../Components/Signup'

export const RootNav = StackNavigator(
  {
    LocationPermissionScreen: { screen: AskLocation },
    OnboardingScreen: { screen: OnboardingScreen },
    SplashScreen: { screen: SplashScreen },
    PlanScreen: { screen: GamePlanScreen },
    SignupScreen: { screen: SignupScreen },
    SpotSearchTab: { screen: () => <SpotSearchNav /> },
    GameJoinTab: { screen: GameSearchNav },
    ProfileTab: { screen: () => <ProfileNav /> },
    SettingsTab: { screen: SettingsNav }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'SplashScreen'
  }
)

const RootReduxNav = props => {
  const { dispatch, nav } = props
  const navigation = ReactNavigation.addNavigationHelpers({
    dispatch,
    state: nav
  })

  return <RootNav navigation={navigation} />
}

const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(RootReduxNav)
