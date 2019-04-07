import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { FlatList, TouchableOpacity } from 'react-native';
import I18n from '../../../I18n';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import SpotListCardSmall from '../../Spots/SpotListCardSmall';
import Spacer from '../../Common/Spacer';
import NothingFound from '../../Common/NothingFound';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: clean. Can we merge with SpotsList?
const UserSpots = ({ spots, onCardPress }) => (
  <FlatList
    data={spots}
    keyExtractor={item => item.uuid}
    renderItem={({ item: spot }) => (
      <TouchableOpacity
        // testID={`pickSpot_${numGenerator()}`}
        key={spot.uuid}
        // Pass event up to parent component
        onPress={() => { onCardPress(spot); }}
        activeOpacity={1}
      >
        <SpotListCardSmall spot={spot} />
      </TouchableOpacity>
    )}
    ListEmptyComponent={(
      <NothingFound
        iconSet="MaterialCommunityIcons"
        iconName="map-marker"
        text={I18n.t('userSpots.noSpots')}
      />
    )}
    ItemSeparatorComponent={() => (<Spacer size="M" />)}
    showsVerticalScrollIndicator={false}
    // onRefresh={refetch}
    // refreshing={loading}
    // onEndReached={loadMore}
    // onEndReachedThreshold={0.1}
    contentContainerStyle={{
      flexGrow: 1, // centers not-found-component
      paddingVertical: 16,
    }}
  />
);

UserSpots.propTypes = {
  spots: PropTypes.arrayOf(propType(spotFragment)).isRequired,
  onCardPress: PropTypes.func,
};

UserSpots.defaultProps = {
  onCardPress: () => {},
};

export default UserSpots;
