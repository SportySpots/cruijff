import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity } from 'react-native';
import { propType } from 'graphql-anywhere';
import I18n from '../../../I18n';
import { QueryCatchErrors } from '../../../GraphQL/QueryCatchErrors';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import GET_SPOTS from '../../../GraphQL/Spots/Queries/GET_SPOTS';
import NothingFound from '../../Common/NothingFound';
import Spacer from '../../Common/Spacer';
import SpotListCard from '../SpotListCard';
import SpotListCardSmall from '../SpotListCardSmall';
import { curatedSpots } from './utils';
import { makeNumGenerator } from '../../../utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotsList = ({
  cardComponent,
  sportsIds,
  coords,
  maxDistance,
  selectedSpot,
  onCardPress,
  ...rest
}) => {
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

        // Curate spots (only with unique UUID)
        const spots = data ? curatedSpots(data.spots) : [];

        // Centers not-found-component in case no spots were found
        const containerStyles = !spots || spots.length === 0 ? { justifyContent: 'center' } : {};

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
            onEndReached={spots.length > 3 ? loadMore : () => null}
            onEndReachedThreshold={0.1}
            contentContainerStyle={{
              flexGrow: 1,
              paddingVertical: 8,
              ...containerStyles,
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
  maxDistance: PropTypes.number, // km
  selectedSpot: propType(spotFragment),
  onCardPress: PropTypes.func,
  // Plus all FlatList native props
};

SpotsList.defaultProps = {
  sportsIds: [],
  coords: {
    latitude: 0,
    longitude: 0,
  },
  maxDistance: 50,
  selectedSpot: null,
  onCardPress: () => {},
};

export default SpotsList;
