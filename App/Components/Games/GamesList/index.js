import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity } from 'react-native';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import I18n from '../../../I18n';
import gameFragment from '../../../GraphQL/Games/Fragments/game';
import NothingFound from '../../Common/NothingFound';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: remove margin, use List spacer and Spacer comp
const CardContainer = styled(TouchableOpacity)`
  margin-vertical: 4px;
`;
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
    contentContainerStyle={{ flexGrow: 1 }}
    data={games}
    ListEmptyComponent={withEmptyComponent && (
      <NothingFound icon="calendar-plus" text={I18n.t('No games found')} />
    )}
    renderItem={({ item: game }) => (
      <CardContainer
        key={game.uuid}
        onPress={() => { onCardPress(game.uuid); }}
        activeOpacity={1}
      >
        {React.createElement(cardComponent, { game })}
      </CardContainer>
    )}
    keyExtractor={item => item.uuid}
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
