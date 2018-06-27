import React from 'react';
import { propType } from 'graphql-anywhere';
import { TabBarTop, TabNavigator } from 'react-navigation';
import Colors from '../../../Themes/Colors';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
import UserSpots from './UserSpots';
import UserGames from './UserGames';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Tabs = ({ user }) => (
  React.createElement(new TabNavigator({
    spots: {
      screen: () => <UserSpots user={user} />,
    },
    games: {
      screen: () => <UserGames user={user} />,
    },
  }, {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    tabBarOptions: {
      style: {
        backgroundColor: Colors.white,
      },
      labelStyle: {
        color: 'black',
        fontWeight: '700',
      },
      indicatorStyle: {
        backgroundColor: Colors.primaryGreen,
        height: 4,
      },
    },
    initialRouteName: 'spots',
  }))
);

Tabs.propTypes = {
  user: propType(userDetailsFragment).isRequired,
};

export default Tabs;
