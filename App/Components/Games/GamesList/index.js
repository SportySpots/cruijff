import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { FlatList, TouchableOpacity } from 'react-native';
import I18n from '../../../I18n';
import gameFragment from '../../../GraphQL/Games/Fragments/game';
import NothingFound from '../../Common/NothingFound';
import Spacer from '../../Common/Spacer';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GamesList = ({
  games,
  withEmptyComponent,
  cardComponent,
  onCardPress,
  ...rest
}) => (
  <FlatList
    showsVerticalScrollIndicator={false}
    data={games}
    ListEmptyComponent={withEmptyComponent && (
      <NothingFound icon="calendar-plus" text={I18n.t('No games found')} />
    )}
    renderItem={({ item: game }) => (
      <TouchableOpacity
        key={game.uuid}
        onPress={() => { onCardPress(game.uuid); }}
        activeOpacity={1}
      >
        {React.createElement(cardComponent, { game })}
      </TouchableOpacity>
    )}
    keyExtractor={item => item.uuid}
    ItemSeparatorComponent={() => (
      <Spacer orientation="column" size="M" />
    )}
    {...rest}
  />
);

GamesList.propTypes = {
  games: PropTypes.arrayOf(propType(gameFragment)),
  withEmptyComponent: PropTypes.bool,
  cardComponent: PropTypes.func.isRequired,
  onCardPress: PropTypes.func,
};

GamesList.defaultProps = {
  games: [],
  withEmptyComponent: true,
  onCardPress: () => {},
};

export default GamesList;
