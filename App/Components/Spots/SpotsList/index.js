import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { FlatList } from 'react-native';
import GET_SPOTS_FOR_SPORT from '../../../GraphQL/Spots/Queries/GET_SPOTS_FOR_SPORT';
import Spacer from '../../Common/Spacer';
import CenteredActivityIndicator from '../../Common/CenteredActivityIndicator';
import SpotCard from '../SpotListCardSmall';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: move query up and use SpotsListOld instead
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          data={data.spots}
          keyExtractor={item => item.uuid}
          renderItem={({ item }) => (
            <SpotCard
              spot={item}
              onPress={onSpotPress}
            />
          )}
          ItemSeparatorComponent={() => (
            <Spacer orientation="column" size="L" />
          )}
        />
      );
    }}
  </Query>
);

SpotsList.propTypes = {
  sport: PropTypes.string.isRequired,
  onSpotPress: PropTypes.func,
};

SpotsList.defaultProps = {
  onSpotPress: () => {},
};

export default SpotsList;
