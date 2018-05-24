import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { propType } from 'graphql-anywhere';
import spotFragment from '../../GraphQL/Spots/Fragments/spot';
import { cardList } from '../Spots/Styles/CardStyles';
import NothingFound from '../NothingFound';
import I18n from '../../I18n';

const SpotsList = ({
  data,
  spots,
  cardComponent,
  onCardPress,
  style,
  refetch,
  loading,
}) => {
  const spotsForList = data && data.spots ? data.spots : spots;

  return (
    <View style={[cardList.container, style, { flex: 1 }]}>
      <FlatList
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        data={spotsForList}
        refreshing={loading}
        ListEmptyComponent={<NothingFound icon="map-marker" text={I18n.t('No spots found')} />}
        renderItem={({ item: spot }) => (
          <TouchableOpacity
            key={spot.uuid}
            onPress={() => {
              onCardPress(spot.uuid);
            }}
            style={cardList.cardContainer}
          >
            {React.createElement(cardComponent, {spot})}
          </TouchableOpacity>
        )}
        keyExtractor={item => item.uuid}
      />
    </View>
  );
};

SpotsList.propTypes = {
  data: PropTypes.shape({
    spots: PropTypes.arrayOf(propType(spotFragment)),
  }),
  loading: PropTypes.bool,
  refetch: PropTypes.func.isRequired,
  spots: PropTypes.arrayOf(propType(spotFragment)),
  cardComponent: PropTypes.func.isRequired,
  onCardPress: PropTypes.func,
  style: PropTypes.object, // eslint-disable-line
};

SpotsList.defaultProps = {
  data: {},
  spots: [],
  onCardPress: () => {},
  style: {},
};

export default SpotsList;
