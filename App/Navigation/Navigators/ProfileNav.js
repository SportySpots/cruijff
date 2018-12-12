import React from 'react';
import { createStackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import LoggedInRoute from '../LoggedInRoute';
import AuthScreens from './AuthScreens';
import LoggedOutScreen from '../../Screens/Auth/LoggedOutScreen';
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
  ProfileEditScreen: {
    screen: ({ navigation }) => (
      <LoggedInRoute
        navigation={navigation}
        component={ProfileEditScreen}
        overlay={LoggedOutScreen}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Profile Edit'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  ProfileDetailsScreen: {
    screen: () => (
      <LoggedInRoute
        component={ProfileDetailsScreen}
        overlay={LoggedOutScreen}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('profileScreenTitle'),
      headerTitleStyle,
      headerRight: <UserMenu navigation={navigation} />,
    }),
  },
}, {
  initialRouteName: 'ProfileDetailsScreen',
});

export default ProfileNav;
