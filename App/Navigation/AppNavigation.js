import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';
import React from 'react';
import {
  GameSearchNav,
  PlanGameNav,
  ProfileNav,
  InfoNav,
  SpotSearchNav,
} from './Navigators';
import I18n from '../I18n';
import NavBar from '../Components/NavBar';
import SplashScreen from '../Screens/SplashScreen';
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';
import OnboardingScreen from '../Components/Onboarding';
import AskLocation from '../Screens/AskLocationScreen';
import StackBackHeader from '../Components/StackBackHeader';

export const MainTabsNav = TabNavigator(
  {
    SpotSearchTab: { screen: SpotSearchNav },
    GameSearchTab: { screen: GameSearchNav },
    ProfileTab: { screen: ProfileNav },
    InfoTab: { screen: InfoNav },
  },
  {
    tabBarComponent: NavBar,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    initialRouteName: 'SpotSearchTab',
  },
);

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
      navigationOptions: {
        header: null,
      },
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions({ navigation }) {
        return {
          headerLeft: (
            <StackBackHeader
              title={I18n.t('login')}
              onPress={() => { navigation.goBack(null); }}
            />
          ),
        };
      },
    },
    SignupScreen: {
      screen: SignupScreen,
      navigationOptions({ navigation }) {
        return {
          headerLeft: (
            <StackBackHeader
              title={I18n.t('Sign up')}
              onPress={() => { navigation.goBack(null); }}
            />
          ),
        };
      },
    },
  },
  {
    initialRouteName: 'RootNav',
  },
);
