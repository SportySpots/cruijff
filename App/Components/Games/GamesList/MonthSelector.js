import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { propType } from 'graphql-anywhere';
import gameFragment from '../../GraphQL/Games/Fragments/game';
import { cardList } from './Styles/CardStyles';
import NothingFound from '../NothingFound';
import I18n from '../../I18n';

const GamesList = ({
  games,
  cardComponent,
  onCardPress,
  style,
  ...rest
}) => (
  <View style={[cardList.container, style, { flex: 1 }]}>
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      data={games}
      ListEmptyComponent={<NothingFound icon="cancel" text={I18n.t('No games found')} />}
      renderItem={({ item: game }) => (
        <TouchableOpacity
          key={game.uuid}
          onPress={() => { onCardPress(game.uuid); }}
          style={cardList.cardContainer}
        >
          {React.createElement(cardComponent, { game })}
        </TouchableOpacity>
      )}
      keyExtractor={item => item.uuid}
      {...rest}
    />
  </View>
);

GamesList.propTypes = {
  games: PropTypes.arrayOf(propType(gameFragment)),
  cardComponent: PropTypes.func.isRequired,
  onCardPress: PropTypes.func,
  style: PropTypes.object,
};

GamesList.defaultProps = {
  games: [],
  onCardPress: () => {},
  style: {},
};

export default GamesList;
