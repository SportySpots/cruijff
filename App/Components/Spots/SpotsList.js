import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { propType } from 'graphql-anywhere';
import spotFragment from '../../GraphQL/Spots/Fragments/spot';
import { cardList } from '../Spots/Styles/CardStyles';

const SpotsList = ({
  data,
  spots,
  cardComponent,
  onCardPress,
  style,
  refetch,
  loading,
}) => (
  <View style={[cardList.container, style]}>
    <FlatList
      onRefresh={() => console.log('refetch') || refetch()}
      showsVerticalScrollIndicator={false}
      data={data && data.spots ? data.spots : spots}
      refreshing={loading}
      renderItem={({ item: spot }) => (
        <TouchableOpacity
          key={spot.uuid}
          onPress={() => {
            onCardPress(spot.uuid);
          }}
          style={cardList.cardContainer}
        >
          {React.createElement(cardComponent, { spot })}
        </TouchableOpacity>
      )}
      keyExtractor={item => item.uuid}
    />
  </View>
);

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
