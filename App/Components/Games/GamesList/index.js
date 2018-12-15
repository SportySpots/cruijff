import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { FlatList, TouchableOpacity } from 'react-native';
import I18n from '../../../I18n';
import { addGlobalRef } from '../../../globalRefs';
import gameFragment from '../../../GraphQL/Games/Fragments/game';
import NothingFound from '../../Common/NothingFound';
import Spacer from '../../Common/Spacer';
import GameListCard from '../GameListCard';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GamesList = ({
  games,
  onCardPress,
  ...rest
}) => (
  <FlatList
    testID="gamesFlatList"
    ref={addGlobalRef('gamesFlatList')}
    showsVerticalScrollIndicator={false}
    data={games}
    keyExtractor={item => item.uuid}
    renderItem={({ item: game }) => (
      <TouchableOpacity
        testID={`game_${game.uuid}`}
        key={game.uuid}
        onPress={() => { onCardPress(game); }}
        activeOpacity={1}
      >
        <GameListCard game={game} />
      </TouchableOpacity>
    )}
    ListEmptyComponent={<NothingFound icon="calendar-plus" text={I18n.t('gamesList.noResults')} />}
    ItemSeparatorComponent={() => (<Spacer size="ML" />)}
    onEndReachedThreshold={0.1}
    contentContainerStyle={{
      flexGrow: 1, // centers not-found-component
      paddingVertical: 8,
    }}
    {...rest}
  />
);

GamesList.propTypes = {
  games: PropTypes.arrayOf(propType(gameFragment)),
  onCardPress: PropTypes.func,
};

GamesList.defaultProps = {
  games: [],
  onCardPress: () => {},
};

export default GamesList;
