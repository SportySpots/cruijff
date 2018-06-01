import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { propType } from 'graphql-anywhere';
import spotFragment from '../../GraphQL/Spots/Fragments/spot';
import { cardList } from './Styles/CardStyles';
import NothingFound from '../NothingFound';
import I18n from '../../I18n';

const SpotsList = ({
  spots,
  cardComponent,
  onCardPress,
  onRefresh,
  refreshing,
  style,
}) => (
  <View style={[cardList.container, style, { flex: 1 }]}>
    <FlatList
      onRefresh={onRefresh}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      data={spots}
      refreshing={refreshing}
      ListEmptyComponent={<NothingFound icon="map-marker" text={I18n.t('No spots found')} />}
      renderItem={({ item: spot }) => (
        <TouchableOpacity
          key={spot.uuid}
          onPress={() => { onCardPress(spot.uuid); }}
          style={cardList.cardContainer}
          activeOpacity={0.8}
        >
          {React.createElement(cardComponent, { spot })}
        </TouchableOpacity>
      )}
      keyExtractor={item => item.uuid}
    />
  </View>
);

SpotsList.propTypes = {
  spots: PropTypes.arrayOf(propType(spotFragment)),
  cardComponent: PropTypes.func.isRequired,
  onCardPress: PropTypes.func,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  style: PropTypes.object,
};

SpotsList.defaultProps = {
  spots: [],
  onCardPress: () => {},
  onRefresh: () => {},
  refreshing: false,
  style: {},
};

export default SpotsList;
