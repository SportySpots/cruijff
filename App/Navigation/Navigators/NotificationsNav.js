import React from 'react';
import { createStackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import LoggedInRoute from '../LoggedInRoute';
import AuthScreens from './AuthScreens';
import LoggedOutScreen from '../../Screens/Auth/LoggedOutScreen';
import NotificationsListScreen from '../../Screens/Notifications/NotificationsListScreen';
import { headerTitleStyle } from './style';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NotificationsNav = createStackNavigator({
  ...AuthScreens,
  NotificationsListScreen: {
    screen: ({ navigation }) => (
      <LoggedInRoute
        component={NotificationsListScreen}
        navigation={navigation}
        overlay={LoggedOutScreen}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('notificationsListScreen.navigation.title'),
      headerTitleStyle,
    }),
  },
}, {
  initialRouteName: 'NotificationsListScreen',
});

export default NotificationsNav;
