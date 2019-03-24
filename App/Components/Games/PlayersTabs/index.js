import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { createMaterialTopTabNavigator } from 'react-navigation';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import I18n from '../../../I18n';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
import Text from '../../Common/Text';
import PlayersList from '../PlayersList';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Label = styled(Text)`
  font-weight: bold;
  color: ${Colors.black};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const PlayersTabs = ({ attendees, absents }) => (
  React.createElement(createMaterialTopTabNavigator({
    Attending: {
      screen: () => (
        <PlayersList players={attendees} />
      ),
      navigationOptions: {
        tabBarLabel: <Label>{I18n.t('playersTabs.attending')}</Label>,
      },
    },
    Declining: {
      screen: () => (
        <PlayersList players={absents} />
      ),
      navigationOptions: {
        tabBarLabel: <Label>{I18n.t('playersTabs.declined')}</Label>,
      },
    },
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
    initialRouteName: 'Attending',
  }))
);

PlayersTabs.propTypes = {
  attendees: PropTypes.arrayOf(
    PropTypes.shape({
      user: propType(userDetailsFragment),
      createdAt: PropTypes.instanceOf(Date),
    }),
  ),
  absents: PropTypes.arrayOf(
    PropTypes.shape({
      user: propType(userDetailsFragment),
      createdAt: PropTypes.instanceOf(Date),
    }),
  ),
};

PlayersTabs.defaultProps = {
  attendees: [],
  absents: [],
};

export default PlayersTabs;
