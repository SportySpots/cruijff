import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uniqBy } from 'ramda';
import geolib from 'geolib';
import styled from 'styled-components';
import Colors from '../../Themes/Colors';
import { QueryCatchErrors } from '../../GraphQL/QueryCatchErrors';
import GET_SPOTS from '../../GraphQL/Spots/Queries/GET_SPOTS';
import Card from '../../Components/Spots/SpotListCard';
import SpotsList from '../../Components/Spots/SpotsList';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1;
  padding: 0 4px;
  background-color: ${Colors.concrete};
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
/**
 * @summary Make sure spots are unique.
 */
const curatedSpots = spots => (
  spots && spots.length > 0
    ? uniqBy(({ uuid }) => (uuid), spots)
    : []
);
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

    let position;
    try {
      position = await getCurrentPosition(options);
    } catch (exc) {
      console.log("Oops, we couldn't get your position! Make sure you GPS is enabled ;)", exc);
    }

    const coordsSet = (
      position &&
      position.coords &&
      position.coords.latitude &&
      position.coords.latitude
    );
    if (!coordsSet) { return; }
    const { latitude, longitude } = position.coords;
    this.setState({ coords: { latitude, longitude } });
  }

  handleCardPress = (spot) => {
    this.props.navigation.navigate('SpotDetailsScreen', {
      uuid: spot.uuid,
    });
  }

  render() {
    const { maxDistance, allSports, selectedSportIds } = this.props;
    const { coords } = this.state;

    // Set query variables
    const variables = {
      offset: 0,
      limit: 20,
      distance: `${parseInt(1000 * maxDistance, 10)}:52.3727729:4.9055008`, // TODO: use current user location
    };

    if (!allSports) {
      variables.sports__ids = selectedSportIds;
    }

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

          return (
            <Container>
              <SpotsList
                spots={(
                  selectedSportIds &&
                  selectedSportIds.length > 0 &&
                  data &&
                  data.spots &&
                  curatedSpots(data.spots).map((spot) => {
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
      </QueryCatchErrors>
    );
  }
}

SpotsListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  maxDistance: PropTypes.number.isRequired,
  allSports: PropTypes.bool.isRequired,
  selectedSportIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => state.spotFilters;
const withRedux = connect(mapStateToProps, null);

export default withRedux(SpotsListScreen);
