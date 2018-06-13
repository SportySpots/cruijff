import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import geolib from 'geolib';
import styled from 'styled-components';
import Colors from '../../Themes/Colors';
import SpotsList from '../../Components/Spots/SpotsList';
import GET_SPOTS from '../../GraphQL/Spots/Queries/GET_SPOTS';
import Text from '../../Components/Text';
import Card from '../../Components/Spots/SpotListCard';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1;
  padding: 0 8px;
  background-color: ${Colors.bgGrey};
`;
// -----------------------------------------------------------------------------
// AUX FUNCTIONS:
// -----------------------------------------------------------------------------
const getSpotLocation = spot => ({
  latitude: spot && spot.address && spot.address.lat,
  longitude: spot && spot.address && spot.address.lng,
});
// ------------------------------------------------------------------------------
const getCurrentPosition = (options = {}) =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
//------------------------------------------------------------------------------
const rounded = number => (Math.round(number * 10) / 10);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SpotsListScreen extends React.Component {
  state = {
    coords: null,
  }

  async componentWillMount() {
    if (!('geolocation' in navigator)) {
      console.log('Geolocation is not available');
      return;
    }

    // Get user's position from navigator
    const options = {
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 100000,
    };

    try {
      const position = await getCurrentPosition(options);
      const coordsSet = (
        position &&
        position.coords &&
        position.coords.latitude &&
        position.coords.latitude
      );
      if (!coordsSet) { return; }
      const { latitude, longitude } = position.coords;
      this.setState({ coords: { latitude, longitude } });
    } catch (exc) {
      console.log("Oops, we couldn't get your position! Make sure you GPS is enabled ;)", exc);
    }
  }

  handleCardPress = (spotId) => {
    this.props.navigation.navigate('SpotDetailsScreen', {
      uuid: spotId,
    });
  }

  render() {
    const { coords } = this.state;

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

          return (
            <Container>
              <SpotsList
                spots={(
                  data &&
                  data.spots &&
                  data.spots.map((spot) => {
                    if (!coords || !spot.address) { return spot; }
                    const latLng = getSpotLocation(spot);
                    const distance = rounded(geolib.getDistance(coords, latLng) / 1000);
                    return Object.assign({}, spot, { distance });
                  })
                ) || []}
                cardComponent={Card}
                onCardPress={this.handleCardPress}
                // FlatList props
                onRefresh={refetch}
                refreshing={loading}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
              />
            </Container>
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
