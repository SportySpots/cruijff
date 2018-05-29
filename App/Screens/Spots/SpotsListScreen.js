import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import SpotsList from '../../Components/Spots/SpotsList';
import GET_SPOTS from '../../GraphQL/Spots/Queries/GET_SPOTS';
import Text from '../../Components/Text';
import Card from '../../Components/Spots/SpotListCard';
import CenteredActivityIndicator from '../../Components/CenteredActivityIndicator';

class SpotsListScreen extends React.Component {
  handleCardPress = (spotId) => {
    this.props.navigation.navigate('SpotDetailsScreen', {
      uuid: spotId,
    });
  };

  render() {
    return (
      <Query query={GET_SPOTS}>
        {({
          loading,
          error,
          data,
          refetch,
        }) => {
          if (loading) return <CenteredActivityIndicator />;
          if (error) return <Text>Error :( {JSON.stringify(error)}</Text>;

          if (!data || !data.spots) {
            return <Text>No data!</Text>;
          }

          return (
            <SpotsList
              spots={data.spots}
              cardComponent={Card}
              onCardPress={this.handleCardPress}
              onRefresh={refetch}
              refreshing={loading}
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
