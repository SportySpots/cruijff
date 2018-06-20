import React from 'react';
import { propType } from 'graphql-anywhere';
import { TabBarTop, TabNavigator } from 'react-navigation';
import I18n from '../../../I18n/index';
import Colors from '../../../Themes/Colors';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
import Text from '../../Text';
import UserSpots from './UserSpots';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Tabs = ({ user }) => (
  React.createElement(new TabNavigator({
    spots: {
      screen: () => <UserSpots user={user} />,
    },
    games: {
      screen: () => <Text>{I18n.t('Games')}</Text>,
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
