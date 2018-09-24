import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { Query } from 'react-apollo';
import { FlatList } from 'react-native';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import GET_SPOTS_FOR_SPORT from '../../../GraphQL/Spots/Queries/GET_SPOTS_FOR_SPORT';
import CenteredActivityIndicator from '../../Common/CenteredActivityIndicator';
import SpotCard from '../SpotListCardSmall';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotsList = ({ sport, onSpotPress }) => (
  <Query
    query={GET_SPOTS_FOR_SPORT}
    variables={{
      limit: 30, // TODO: implement pagination
      offset: 0,
      sport,
    }}
  >
    {({ loading, error, data }) => {
      if (loading) { return <CenteredActivityIndicator />; }
      if (error || !data) { return null; }

      return (
        <FlatList
          data={data.spots}
          keyExtractor={item => item.uuid}
          renderItem={({ item }) => (
            <SpotCard
              spot={item}
              onPress={onSpotPress}
            />
          )}

          ItemSeparatorComponent={null}
        />
      );
    }}
  </Query>
);

SpotsList.propTypes = {
  sport: propType(spotFragment),
  onSpotPress: PropTypes.func,
};

SpotsList.defaultProps ={
  sport: null,
  onSpotPress: () => {},
};

export default SpotsList;
