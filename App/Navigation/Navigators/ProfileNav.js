import React from 'react';
import { createStackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import LoggedInRoute from '../LoggedInRoute';
import AuthScreens from './AuthScreens';
import LoggedOutScreen from '../../Screens/Auth/LoggedOutScreen';
import InfoScreen from '../../Screens/Profile/InfoScreen';
import SettingsScreen from '../../Screens/Profile/SettingsScreen';
import ProfileDetailsScreen from '../../Screens/Profile/ProfileDetailsScreen';
import ProfileEditScreen from '../../Screens/Profile/ProfileEditScreen';
import UserMenu from '../../Components/Profile/UserMenu';
import { headerTitleStyle } from './style';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const backBtn = navigation => (
  <StackBackHeader
    onPress={() => { navigation.goBack(null); }}
  />
);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfileNav = createStackNavigator({
  ...AuthScreens,
  InfoScreen: {
    screen: InfoScreen,
    navigationOptions: () => ({
      headerTitle: I18n.t('infoScreen.title'),
      headerTitleStyle,
    }),
  },
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: () => ({
      headerTitle: I18n.t('settingsScreen.title'),
      headerTitleStyle,
    }),
  },
  ProfileEditScreen: {
    screen: ({ navigation }) => (
      <LoggedInRoute
        navigation={navigation}
        component={ProfileEditScreen}
        overlay={LoggedOutScreen}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('editProfileScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  ProfileDetailsScreen: {
    screen: ({ navigation }) => (
      <LoggedInRoute
        component={ProfileDetailsScreen}
        navigation={navigation}
        overlay={LoggedOutScreen}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('profileScreen.navigation.title'),
      headerTitleStyle,
      headerRight: <UserMenu navigation={navigation} />,
    }),
  },
}, {
  initialRouteName: 'ProfileDetailsScreen',
});

export default ProfileNav;
