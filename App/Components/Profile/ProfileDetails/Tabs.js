import React from 'react';
import { propType } from 'graphql-anywhere';
import { TabBarTop, TabNavigator } from 'react-navigation';
import Colors from '../../../Themes/Colors';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
import UserSpots from './UserSpots';
import UserGames from './UserGames';
import I18n from '../../../I18n';

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
      navigationOptions: {
        tabBarLabel: I18n.t('Activities'),
      }
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
