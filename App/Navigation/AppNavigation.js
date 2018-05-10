import React from 'react';
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';

import SplashScreen from '../Screens/SplashScreen';
import OnboardingScreen from '../Components/Onboarding';
import {
  GameSearchNav,
  PlanGameNav,
  ProfileNav,
  SettingsNav,
  SpotSearchNav,
} from './Navigators';
import AskLocation from '../Screens/AskLocationScreen';
import SignupScreen from '../Screens/SignupScreen';
import { View } from 'react-native';
import NavBar from '../Components/NavBar';
import LoginScreen from '../Screens/LoginScreen';
import I18n from '../I18n';

/*
  Stack Navigator has support for a (custom) NavBar,
  We can't use it since our NavBar has the center button
  partly overlapping the View above it
 */
const withNavBar = (Navigator) => {
  const navigator = props => (
    <View style={{ flex: 1 }}>
      <Navigator {...props} />
      <NavBar {...props} />
    </View>
  );
  navigator.router = Navigator.router;
  return navigator;
};

export const MainTabsNav = withNavBar(TabNavigator(
  {
    SpotSearchTab: { screen: SpotSearchNav },
    GameSearchTab: { screen: GameSearchNav },
    ProfileTab: { screen: ProfileNav },
    SettingsTab: { screen: SettingsNav },
  },
  {
    tabBarComponent: () => null,
    animationEnabled: false,
    swipeEnabled: false,
    initialRouteName: 'SpotSearchTab',
  },
));

export const MainNav = StackNavigator(
  {
    MainTabs: { screen: MainTabsNav, navigationOptions: { header: null } },
    PlanScreen: { screen: PlanGameNav, navigationOptions: { header: null } },
  },
  {
    initialRouteName: 'MainTabs',
  },
);

const RootNav = SwitchNavigator(
  {
    LocationPermissionScreen: { screen: AskLocation },
    OnboardingScreen: { screen: OnboardingScreen },
    SplashScreen: { screen: SplashScreen },
    MainNav: { screen: MainNav },
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'SplashScreen',
    tabBarComponent: () => null,
  },
);

export default StackNavigator(
  {
    RootNav: {
      screen: RootNav,
      navigationOptions: { header: null },
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        title: I18n.t('login'),
      },
    },
    SignupScreen: {
      screen: SignupScreen,
      navigationOptions: { title: I18n.t('Sign up') },
    },
  },
  {
    initialRouteName: 'RootNav',
  },
);
