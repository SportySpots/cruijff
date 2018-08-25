import React from 'react';
import { StackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import LoggedInRoute from '../LoggedInRoute';
import LoginScreen from '../../Screens/LoginScreen';
import SignupScreen from '../../Screens/SignupScreen';
import ProfileSignupScreen from '../../Screens/Profile/ProfileSignupScreen';
import ProfileDetailsScreen from '../../Screens/Profile/ProfileDetailsScreen';
import ProfileEditScreen from '../../Screens/Profile/ProfileEditScreen';
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
const ProfileNav = StackNavigator({
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
    screen: () => (
      <LoggedInRoute
        component={ProfileEditScreen}
        overlay={ProfileSignupScreen}
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
        overlay={ProfileSignupScreen}
      />
    ),
    navigationOptions: () => ({
      headerTitle: I18n.t('Profile'),
    }),
  },
}, {
  initialRouteName: 'ProfileDetailsScreen',
});

export default ProfileNav;
