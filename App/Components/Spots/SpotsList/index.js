import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity } from 'react-native';
import { propType } from 'graphql-anywhere';
import geolib from 'geolib';
import I18n from '../../../I18n';
import { withLocation, locationPropTypes } from '../../../Context/Location';
import { QueryCatchErrors } from '../../../GraphQL/QueryCatchErrors';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import GET_SPOTS from '../../../GraphQL/Spots/Queries/GET_SPOTS';
import NothingFound from '../../Common/NothingFound';
import Spacer from '../../Common/Spacer';
import SpotListCard from '../SpotListCard';
import SpotListCardSmall from '../SpotListCardSmall';
import { curatedSpots, getSpotLocation, rounded } from './utils';
import { makeNumGenerator } from '../../../utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotsList = ({
  cardComponent,
  sportsIds,
  location,
  maxDistance,
  selectedSpot,
  onCardPress,
  ...rest
}) => {
  if (!location || !location.coords) { return null; }

  const { coords } = location;
  const Card = cardComponent === 'SpotListCard' ? SpotListCard : SpotListCardSmall;

  // Set query variables
  const variables = {
    sports__ids: sportsIds, // empty array will return all spots
    distance: `${parseInt(1000 * maxDistance, 10)}:${coords.latitude}:${coords.longitude}`,
    offset: 0,
    limit: 10,
    ordering: 'distance',
  };

  const numGenerator = makeNumGenerator();

  return (
    <QueryCatchErrors
      query={GET_SPOTS}
      variables={variables}
      fetchPolicy="cache-and-network"
    >
      {({
        loading,
        data,
        refetch,
        fetchMore,
      }) => {
        const loadMore = () => {
          fetchMore({
            variables: {
              offset: (data && data.spots && data.spots.length) || 0,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return Object.assign({}, prev, {
                spots: [...prev.spots, ...fetchMoreResult.spots],
              });
            },
          });
        };

        // Curate games and attach distance
        const spots = (
          data
          && data.spots
          && curatedSpots(data.spots).map((spot) => {
            if (!coords || !spot.address) { return spot; }
            const latLng = getSpotLocation(spot);
            const distance = rounded(geolib.getDistance(coords, latLng) / 1000);
            return Object.assign({}, spot, { distance });
          })
        ) || [];

        return (
          <FlatList
            data={spots}
            keyExtractor={item => item.uuid}
            renderItem={({ item: spot }) => (
              <TouchableOpacity
                testID={`pickSpot_${numGenerator()}`}
                key={spot.uuid}
                // Pass event up to parent component
                onPress={() => { onCardPress(spot); }}
                activeOpacity={1}
              >
                <Card
                  spot={spot}
                  active={(selectedSpot && selectedSpot.uuid === spot.uuid) || false}
                />
              </TouchableOpacity>
            )}
            ListEmptyComponent={(!loading && (
              <NothingFound
                iconSet="MaterialCommunityIcons"
                iconName="map-marker"
                text={I18n.t('spotsList.noResults')}
              />
            ))}
            ItemSeparatorComponent={() => <Spacer size="ML" />}
            showsVerticalScrollIndicator={false}
            onRefresh={refetch}
            refreshing={loading}
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
            contentContainerStyle={{
              flexGrow: 1, // centers not-found-component
              paddingVertical: 8,
            }}
            {...rest}
          />
        );
      }}
    </QueryCatchErrors>
  );
};

SpotsList.propTypes = {
  cardComponent: PropTypes.oneOf(['SpotListCard', 'SpotListCardSmall']).isRequired,
  sportsIds: PropTypes.arrayOf(PropTypes.string),
  location: locationPropTypes.location,
  maxDistance: PropTypes.number, // km
  selectedSpot: propType(spotFragment),
  onCardPress: PropTypes.func,
  // Plus all FlatList native props
};

SpotsList.defaultProps = {
  sportsIds: [],
  location: null,
  maxDistance: 50,
  selectedSpot: null,
  onCardPress: () => {},
};

export default withLocation(SpotsList);
