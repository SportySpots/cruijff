import React from 'react';
import { createStackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import LoggedInRoute from '../LoggedInRoute';
import LoginScreen from '../../Screens/Auth/LoginScreen';
import SignupScreen from '../../Screens/Auth/SignupScreen';
import LoggedOutScreen from '../../Screens/Auth/LoggedOutScreen';
import PlanGameScreen from '../../Screens/Plan/PlanGameScreen';
import ShareGameScreen from '../../Screens/Plan/ShareGameScreen';
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
const PlanGameNav = createStackNavigator({
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
  shareGameScreen: {
    screen: ({ navigation }) => (
      <LoggedInRoute
        component={ShareGameScreen}
        navigation={navigation}
        overlay={LoggedOutScreen}
        closable
        onClose={() => { navigation.goBack(null); }}
      />
    ),
    navigationOptions: {
      header: null,
    },
  },
  planGameScreen: {
    screen: ({ navigation }) => (
      <LoggedInRoute
        component={PlanGameScreen}
        navigation={navigation}
        overlay={LoggedOutScreen}
        closable
        onClose={() => { navigation.goBack(null); }}
      />
    ),
    navigationOptions: {
      header: null,
    },
  },
}, {
  tabBarComponent: () => null,
  animationEnabled: true,
  initialRouteName: 'planGameScreen',
});

export default PlanGameNav;
