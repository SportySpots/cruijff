import React from 'react';
import { StackNavigator } from 'react-navigation';
import LoggedInRoute from '../LoggedInRoute';
import planWrapper from '../../Containers/Plan/planWrapper';
import ProfileSignupScreen from '../../Screens/Profile/ProfileSignupScreen';
import Created from '../../Screens/Plan/CreatedScreen';
import Description from '../../Screens/Plan/DescriptionScreen';
import PickSpot from '../../Screens/Plan/PickSpotScreen';
import SportAndTime from '../../Screens/Plan/SportAndTimeScreen';

const PlanGameNav = StackNavigator({
  sportTime: {
    screen: () => (
      <LoggedInRoute
        component={planWrapper(SportAndTime)}
        overlay={ProfileSignupScreen}
        closable
      />
    ),
  },
  pickSpot: {
    screen: () => (
      <LoggedInRoute
        component={planWrapper(PickSpot)}
        overlay={ProfileSignupScreen}
      />
    ),
  },
  description: {
    screen: () => (
      <LoggedInRoute
        component={planWrapper(Description)}
        overlay={ProfileSignupScreen}
      />
    ),
  },
  created: {
    screen: () => (
      <LoggedInRoute
        component={planWrapper(Created)}
        overlay={ProfileSignupScreen}
      />
    ),
  },
}, {
  tabBarComponent: () => null,
  animationEnabled: true,
  headerMode: 'none',
  initialRouteName: 'sportTime',
});

export default PlanGameNav;
