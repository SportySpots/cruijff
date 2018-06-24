import React from 'react';
import { StackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import LoggedInRoute from '../LoggedInRoute';
import ProfileSignupScreen from '../../Screens/Profile/ProfileSignupScreen';
import ProfileDetailsScreen from '../../Screens/Profile/ProfileDetailsScreen';
import ProfileEditScreen from '../../Screens/Profile/ProfileEditScreen';
import style from './style';

const { headerTitleStyle } = style;

const ProfileNav = StackNavigator({
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
      headerLeft: (
        <StackBackHeader
          onPress={() => { navigation.goBack(null); }}
        />
      ),
    }),
  },
}, {
  initialRouteName: 'ProfileDetailsScreen',
});

export default ProfileNav;
