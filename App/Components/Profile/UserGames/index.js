import React from 'react';
import { propType } from 'graphql-anywhere';
// import { TabBarTop, TabNavigator } from 'react-navigation';
// import I18n from '../../../I18n/index';
// import Colors from '../../../Themes/Colors';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
// import Text from '../../Text';
import GamesList from '../../Games/GamesList';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const UserGames = ({ user }) => {
  // TODO: use GET_USER_GAMES query
  return (
    <GamesList
      games={(
        user
        && user.profile
        && user.profile.games
      ) || []}
      // onCardPress={this.handleCardPress}
      // FlatList props
      // onRefresh={refetch}
      // refreshing={loading}
      // onEndReached={loadMore}
      // onEndReachedThreshold={0.1}
    />
  );
};

UserGames.propTypes = {
  user: propType(userDetailsFragment).isRequired,
};

export default UserGames;
