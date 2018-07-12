import React from 'react';
import { StackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import LoggedInRoute from '../LoggedInRoute';
import LoginScreen from '../../Screens/LoginScreen';
import SignupScreen from '../../Screens/SignupScreen';
import ProfileSignupScreen from '../../Screens/Profile/ProfileSignupScreen';
import PlanGameScreen from '../../Screens/Plan/PlanGameScreen';
import style from './style';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const { headerTitleStyle } = style;
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
const PlanGameNav = StackNavigator({
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
  planGameScreen: {
    screen: ({ navigation }) => (
      <LoggedInRoute
        component={PlanGameScreen}
        overlay={ProfileSignupScreen}
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


/*
import React from 'react';
import { StackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import LoggedInRoute from '../LoggedInRoute';
import planWrapper from '../../Containers/Plan/planWrapper';
import LoginScreen from '../../Screens/LoginScreen';
import SignupScreen from '../../Screens/SignupScreen';
import ProfileSignupScreen from '../../Screens/Profile/ProfileSignupScreen';
import Created from '../../Screens/Plan/CreatedScreen';
import Description from '../../Screens/Plan/DescriptionScreen';
import PickSpot from '../../Screens/Plan/PickSpotScreen';
import SportAndTime from '../../Screens/Plan/SportAndTimeScreen';
import style from './style';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const { headerTitleStyle } = style;
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
const PlanGameNav = StackNavigator({
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
  sportTime: {
    screen: ({ navigation }) => (
      <LoggedInRoute
        component={planWrapper(SportAndTime)}
        overlay={ProfileSignupScreen}
        closable
        onClose={() => { navigation.goBack(null); }}
      />
    ),
    navigationOptions: {
      header: null,
    },
  },
  pickSpot: {
    screen: ({ navigation }) => (
      <LoggedInRoute
        component={planWrapper(PickSpot)}
        overlay={ProfileSignupScreen}
        closable
        onClose={() => { navigation.goBack(null); }}
      />
    ),
    navigationOptions: {
      header: null,
    },
  },
  description: {
    screen: ({ navigation }) => (
      <LoggedInRoute
        component={planWrapper(Description)}
        overlay={ProfileSignupScreen}
        closable
        onClose={() => { navigation.goBack(null); }}
      />
    ),
    navigationOptions: {
      header: null,
    },
  },
  created: {
    screen: ({ navigation }) => (
      <LoggedInRoute
        component={planWrapper(Created)}
        overlay={ProfileSignupScreen}
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
  // headerMode: 'none',
  initialRouteName: 'sportTime',
});

export default PlanGameNav;
*/
