import React from 'react';
import { propType } from 'graphql-anywhere';
// import { TabBarTop, TabNavigator } from 'react-navigation';
// import I18n from '../../../I18n/index';
// import Colors from '../../../Themes/Colors';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
// import Text from '../../Text';
import SpotsList from '../../Spots/SpotsList';
import Card from '../../Spots/SpotListCard';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const UserSpots = ({ user }) => {
  console.log('****USERRRRR', user);
  return (
    <SpotsList
      spots={(
        user &&
        user.profile &&
        user.profile.spots
      ) || []}
      cardComponent={Card}
      // onCardPress={this.handleCardPress}
      // FlatList props
      // onRefresh={refetch}
      // refreshing={loading}
      // onEndReached={loadMore}
      // onEndReachedThreshold={0.1}
    />
  );
};

UserSpots.propTypes = {
  user: propType(userDetailsFragment).isRequired,
};

export default UserSpots;
