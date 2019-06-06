import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { FlatList, TouchableOpacity } from 'react-native';
import { addGlobalRef } from '../../../globalRefs';
import I18n from '../../../I18n';
import gameFragment from '../../../GraphQL/Games/Fragments/game';
import Spacer from '../../Common/Spacer';
import NothingFound from '../../Common/NothingFound';
import GameListCard from '../GameListCard';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const IMG_HEIGHT = 100;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GamesList = ({
  games,
  onCardPress,
  nothingFoundComp: NothingFoundComp,
  refreshing,
  ...rest
}) => {
  // Centers not-found-component in case no games were found
  const containerStyles = !games || games.length === 0 ? { justifyContent: 'center' } : {};

  return (
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
      ListEmptyComponent={!refreshing && <NothingFoundComp />}
      ItemSeparatorComponent={() => <Spacer size="ML" />}
      onEndReachedThreshold={0.1}
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: 8,
        ...containerStyles,
      }}
      refreshing={refreshing}
      {...rest}
    />
  );
};

GamesList.propTypes = {
  games: PropTypes.arrayOf(propType(gameFragment)),
  onCardPress: PropTypes.func,
  nothingFoundComp: PropTypes.func,
  refreshing: PropTypes.bool,
};

GamesList.defaultProps = {
  games: [],
  onCardPress: () => {},
  nothingFoundComp: () => (
    <NothingFound
      imgSrc="noActivitiesIllustration"
      style={{ height: IMG_HEIGHT, width: parseInt(0.8 * IMG_HEIGHT, 10) }}
      text={I18n.t('gamesList.noResults')}
    />
  ),
  refreshing: false,
};

export default GamesList;
