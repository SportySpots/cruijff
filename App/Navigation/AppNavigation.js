import { StackNavigator, SwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import {
  SplashNav,
  SpotSearchNav,
  GameSearchNav,
  PlanGameNav,
  ProfileNav,
  InfoNav,
} from './Navigators';
import NavBar from '../Components/Common/NavBar';
import OnboardingScreen from '../Screens/OnboardingScreen';
import AskLocation from '../Screens/AskLocationScreen';
import DebugScreen from '../Screens/DebugScreen';

const MainTabsNav = createBottomTabNavigator({
  SpotSearchTab: { screen: SpotSearchNav },
  GameSearchTab: { screen: GameSearchNav },
  ProfileTab: { screen: ProfileNav },
  InfoTab: { screen: InfoNav },
}, {
  tabBarComponent: NavBar,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  initialRouteName: 'SpotSearchTab',
});

const MainNav = StackNavigator({
  MainTabs: { screen: MainTabsNav, navigationOptions: { header: null } },
  PlanScreen: { screen: PlanGameNav, navigationOptions: { header: null } },
}, {
  initialRouteName: 'MainTabs',
});

const RootNav = SwitchNavigator({
  LocationPermissionScreen: { screen: AskLocation },
  OnboardingScreen: { screen: OnboardingScreen },
  SplashScreen: { screen: SplashNav },
  MainNav: { screen: MainNav },
  DebugNav: { screen: DebugScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'SplashScreen',
  tabBarComponent: () => null,
});

export default RootNav;
