import React from 'react';
import { propType } from 'graphql-anywhere';
import { createMaterialTopTabNavigator } from 'react-navigation';
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
const Container = styled.View`
  padding: 0 16px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfileTabs = ({ user }) => (
  React.createElement(createMaterialTopTabNavigator({
    Spots: {
      screen: () => (
        <Container>
          <UserSpots spots={(user && user.profile && user.profile.spots) || []} />
        </Container>
      ),
      navigationOptions: {
        tabBarLabel: (
          <Text bold>
            {I18n.t('profileTabs.spots')}
          </Text>
        ),
      },
    },
    /* Games: {
      screen: () => <UserGames user={user} />,
      navigationOptions: {
        tabBarLabel: I18n.t('profileTabs.activities'),
      },
    }, */
  }, {
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
    initialRouteName: 'Spots',
  }))
);

ProfileTabs.propTypes = {
  user: propType(userDetailsFragment).isRequired,
};

export default ProfileTabs;
