import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';
import {
  SplashNav,
  SpotSearchNav,
  GameSearchNav,
  PlanGameNav,
  ProfileNav,
  InfoNav,
} from './Navigators';
import NavBar from '../Components/Common/NavBar';
import OnboardingScreen from '../Screens/Onboarding/OnboardingScreen';
import CityPicker from '../Components/Onboarding/CityPicker';
import DebugScreen from '../Screens/Debug/DebugScreen';

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
  initialRouteName: 'GameSearchTab',
});

const MainNav = createStackNavigator({
  MainTabs: { screen: MainTabsNav, navigationOptions: { header: null } },
  PlanScreen: { screen: PlanGameNav, navigationOptions: { header: null } },
}, {
  initialRouteName: 'MainTabs',
});

const OnboardingNavigator = createSwitchNavigator({
  Swiper: { screen: OnboardingScreen },
  CityPicker: { screen: CityPicker },
}, {
  initialRouteName: 'Swiper',
});

const AppNavigation = createSwitchNavigator({
  SplashScreen: { screen: SplashNav },
  OnboardingScreen: { screen: OnboardingNavigator },
  MainNav: { screen: MainNav },
  DebugNav: { screen: DebugScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'SplashScreen',
  tabBarComponent: () => null,
});

export default createAppContainer(AppNavigation);

export const getActiveRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // Dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
};
