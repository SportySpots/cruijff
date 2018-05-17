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
import NavBar from '../Components/NavBar';
import LoginScreen from '../Screens/LoginScreen';
import I18n from '../I18n';

export const MainTabsNav = TabNavigator(
  {
    SpotSearchTab: { screen: SpotSearchNav },
    GameSearchTab: { screen: GameSearchNav },
    ProfileTab: { screen: ProfileNav },
    SettingsTab: { screen: SettingsNav },
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
      navigationOptions: {
        title: I18n.t('login'),
      },
    },
    SignupScreen: {
      screen: SignupScreen,
      navigationOptions: {
        title: I18n.t('Sign up'),
      },
    },
  },
  {
    initialRouteName: 'RootNav',
  },
);
