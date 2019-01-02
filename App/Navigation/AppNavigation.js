import React from 'react';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
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
import AskLocationScreen from '../Screens/AskLocationScreen';
import DebugScreen from '../Screens/Debug/DebugScreen';
import { LocationConsumer, PermissionStatus } from '../Context/Location';

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

const MainNav = createStackNavigator({
  MainTabs: { screen: MainTabsNav, navigationOptions: { header: null } },
  PlanScreen: { screen: PlanGameNav, navigationOptions: { header: null } },
}, {
  initialRouteName: 'MainTabs',
});

const RootNav = createSwitchNavigator({
  LocationPermissionScreen: {
    screen: ({ navigation }) => (
      <LocationConsumer>
        { ({ askPermission }) => (
          <AskLocationScreen
            onSuccessHook={() => navigation.navigate('MainNav')}
            askPermission={askPermission}
          />
        )}
      </LocationConsumer>
    ),
  },

  OnboardingScreen: {
    screen: ({ navigation }) => (
      <LocationConsumer>
        { ({ permissionStatus }) => (
          <OnboardingScreen
            onSuccessHook={() => navigation.navigate(
              permissionStatus === PermissionStatus.UNDETERMINED
                ? 'LocationPermissionScreen' : 'MainNav',
            )}
          />
        )}
      </LocationConsumer>
    ),
  },
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
