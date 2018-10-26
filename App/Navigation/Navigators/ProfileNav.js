import React from 'react';
import { createStackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import LoggedInRoute from '../LoggedInRoute';
import LoginScreen from '../../Screens/Auth/LoginScreen';
import SignupScreen from '../../Screens/Auth/SignupScreen';
import LoggedOutScreen from '../../Screens/Auth/LoggedOutScreen';
import ProfileDetailsScreen from '../../Screens/Profile/ProfileDetailsScreen';
import ProfileEditScreen from '../../Screens/Profile/ProfileEditScreen';
import UserMenu from '../../Components/Profile/UserMenu';
import { headerTitleStyle } from './style';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const handleSuccessAuth = (navigation) => {
  // Reset navigation after successful auth
  navigation.popToTop();
};
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
  LoginScreen: {
    screen: ({ navigation }) => (
      <LoginScreen
        navigation={navigation}
        onSuccessHook={() => { handleSuccessAuth(navigation); }}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Hi again!'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  SignupScreen: {
    screen: ({ navigation }) => (
      <SignupScreen
        navigation={navigation}
        onSuccessHook={() => { handleSuccessAuth(navigation); }}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Sign up'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
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
      headerTitle: I18n.t('Profile'),
      headerTitleStyle,
      headerRight: <UserMenu navigation={navigation} />,
    }),
  },
}, {
  initialRouteName: 'ProfileDetailsScreen',
});

export default ProfileNav;
