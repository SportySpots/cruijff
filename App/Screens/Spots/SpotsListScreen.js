import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import SpotsList from '../../Components/Spots/SpotsList';
import GET_SPOTS from '../../GraphQL/Spots/Queries/GET_SPOTS';
import Text from '../../Components/Text';
import Card from '../../Components/Spots/SpotListCard';

class SpotsListScreen extends React.Component {
  handleCardPress = (spotId) => {
    this.props.navigation.navigate('SpotDetailsScreen', {
      uuid: spotId,
    });
  };

  render() {
    return (
      <Query
        query={GET_SPOTS}
        variables={{ offset: 0, limit: 20 }}
        fetchPolicy="cache-and-network"
      >
        {({
          loading,
          error,
          data,
          refetch,
          fetchMore,
        }) => {
          if (error) return <Text>Error :( {JSON.stringify(error)}</Text>;

          const loadMore = () => {
            fetchMore({
              variables: {
                offset: data.spots.length,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                  spots: [...prev.spots, ...fetchMoreResult.spots],
                });
              },
            });
          };

          return (
            <SpotsList
              spots={(data && data.spots) || []}
              cardComponent={Card}
              onCardPress={this.handleCardPress}
              // FlatList props
              onRefresh={refetch}
              refreshing={loading}
              onEndReached={loadMore}
              onEndReachedThreshold={1}
            />
          );
        }}
      </Query>
    );
  }
}

SpotsListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SpotsListScreen;
