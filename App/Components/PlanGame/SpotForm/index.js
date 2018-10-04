import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { Query } from 'react-apollo';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import GET_SPOTS_FOR_SPORT from '../../../GraphQL/Spots/Queries/GET_SPOTS_FOR_SPORT';
import Spacer from '../../Common/Spacer';
import SpotListCardSmall from '../../Spots/SpotListCardSmall';
import SpotsList from '../../Spots/SpotsList';
import curatedSpots from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotForm = ({ sport, spot, onChange }) => (
  <Query
    query={GET_SPOTS_FOR_SPORT}
    variables={{
      limit: 100,
      offset: 0,
      sports__ids: sport && sport.id ? [sport.id] : [],
    }}
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

      return [
        <Spacer key="spacer" size="XL" />,
        <SpotsList
          key="spots"
          spots={(sport && sport.id && data && data.spots && curatedSpots(data.spots)) || []}
          selectedSpot={spot}
          cardComponent={SpotListCardSmall}
          onCardPress={(value) => { onChange({ fieldName: 'spot', value }); }}
          // FlatList props
          onRefresh={refetch}
          refreshing={loading}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
        />,
      ];
    }}
  </Query>
);

SpotForm.propTypes = {
  sport: propType(sportFragment),
  spot: propType(spotFragment),
  onChange: PropTypes.func,
};

SpotForm.defaultProps = {
  sport: null,
  spot: null,
  onChange: () => {},
};

export default SpotForm;
