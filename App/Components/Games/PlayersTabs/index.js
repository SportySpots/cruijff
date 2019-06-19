import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import Colors from '../../../Themes/Colors';
import I18n from '../../../I18n';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
import Text from '../../Common/Text';
import PlayersList from '../PlayersList';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const PlayersTabs = ({ attendees, absents }) => {
  const Navigator = createMaterialTopTabNavigator({
    Attending: {
      screen: () => (
        <PlayersList players={attendees} />
      ),
      navigationOptions: {
        tabBarLabel: (
          <Text bold>
            {I18n.t('playersTabs.attending')}
          </Text>
        ),
      },
    },
    Declining: {
      screen: () => (
        <PlayersList players={absents} />
      ),
      navigationOptions: {
        tabBarLabel: (
          <Text bold>
            {I18n.t('playersTabs.declined')}
          </Text>
        ),
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
  });

  const WrappedNavigator = createAppContainer(Navigator);

  return <WrappedNavigator />;
};

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
