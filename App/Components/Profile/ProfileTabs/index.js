import React from 'react';
import { propType } from 'graphql-anywhere';
import { TabBarTop, TabNavigator } from 'react-navigation';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import I18n from '../../../I18n';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
import Text from '../../Common/Text';
import UserSpots from '../UserSpots';
// import UserGames from '../UserGames';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Label = styled(Text)`
  font-weight: bold;
  color: ${Colors.black};
`;
//------------------------------------------------------------------------------
const Container = styled.View`
  padding: 0 16px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfileTabs = ({ user }) => (
  React.createElement(new TabNavigator({
    spots: {
      screen: () => (
        <Container>
          <UserSpots spots={(user && user.profile && user.profile.spots) || []} />
        </Container>
      ),
      navigationOptions: {
        tabBarLabel: <Label>{I18n.t('My Spots')}</Label>,
      },
    },
    /* games: {
      screen: () => <UserGames user={user} />,
      navigationOptions: {
        tabBarLabel: I18n.t('Activities'),
      },
    }, */
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

ProfileTabs.propTypes = {
  user: propType(userDetailsFragment).isRequired,
};

export default ProfileTabs;
