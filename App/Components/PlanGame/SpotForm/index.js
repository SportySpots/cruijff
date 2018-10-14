import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import Spacer from '../../Common/Spacer';
import SpotsList from '../../Spots/SpotsList';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: get userCoords and maxDistance from context
const SpotForm = ({ sport, spot, onChange }) => [
  <Spacer key="spacer" size="XL" />,
  <SpotsList
    key="spots"
    cardComponent="SpotListCardSmall"
    sportsIds={sport && sport.id ? [sport.id] : []} // empty array will return all spots
    // userCoords={userCoords}
    // maxDistance={maxDistance} // km
    selectedSpot={spot}
    onCardPress={(value) => { onChange({ fieldName: 'spot', value }); }}
  />,
];

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

/*
import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { Query } from 'react-apollo';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import GET_SPOTS from '../../../GraphQL/Spots/Queries/GET_SPOTS';
import Spacer from '../../Common/Spacer';
import SpotListCardSmall from '../../Spots/SpotListCardSmall';
import SpotsList from '../../Spots/SpotsList';
import curatedSpots from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotForm = ({ sport, spot, onChange }) => (
  <Query
    query={GET_SPOTS}
    variables={{
      offset: 0,
      limit: 10,
      sports__ids: sport && sport.id ? [sport.id] : [],
    }}
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

      return [
        <Spacer key="spacer" size="XL" />,
        <SpotsList
          key="spots"
          spots={(data && data.spots && curatedSpots(data.spots)) || []}
          selectedSpot={spot}
          cardComponent={SpotListCardSmall}
          onCardPress={(value) => { onChange({ fieldName: 'spot', value }); }}
          // FlatList props
          onRefresh={refetch}
          refreshing={loading}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{
            paddingBottom: 8,
          }}
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

*/
