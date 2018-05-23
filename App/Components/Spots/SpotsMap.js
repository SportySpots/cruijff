import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import { TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Swiper from 'react-native-swiper';
import Colors from '../../Themes/Colors';
import spotFragment from '../../GraphQL/Spots/Fragments/spot';
import { cardList } from './Styles/CardStyles';

//------------------------------------------------------------------------------
// CONSTANTS:
// -----------------------------------------------------------------------------
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const AMSTERDAM = { latitude: 52.3724437, longitude: 4.8887393 };
// -----------------------------------------------------------------------------
// STYLE:
// -----------------------------------------------------------------------------
const Relative = styled.View`
  position: relative;
  margin: 0;
`;
// -----------------------------------------------------------------------------
const Absolute = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;
// -----------------------------------------------------------------------------
// AUX FUNCTIONS:
// -----------------------------------------------------------------------------
const getSpotLocation = spot => ({
  latitude: spot && spot.address && spot.address.lat,
  longitude: spot && spot.address && spot.address.lng,
});
// -----------------------------------------------------------------------------
// COMPONENT:
// -----------------------------------------------------------------------------
/**
 * @summary Map component displaying a given set of spots. A swiper component
 * is placed at the bottom of the map showing the selected spot details. On
 * render, the map is centered on the 'initialLocation'. The component exposes a
 * onCardPress method.
 * @see {@link https://github.com/leecade/react-native-swiper/issues/68}
 * @see {@link https://github.com/leecade/react-native-swiper/issues/299}
 */
class SpotsMap extends React.PureComponent {
  constructor(props) {
    super(props);

    const initLoc = (
      this.props.spots &&
      this.props.spots.length > 0 &&
      this.props.spots[0] &&
      this.props.spots[0].address
    );

    this.state = {
      region: {
        latitude: (initLoc && initLoc.lat) || AMSTERDAM.latitude,
        longitude: (initLoc && initLoc.lng) || AMSTERDAM.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      currentSpot: 0, // index of the current spot based on the spots array
    };
  }

  /**
   * @summary Fires every time a card is swiped. As a result, the map is
   * re-centered on the spot's location associated to the given card/index.
   * @param {int} index - Index of the card being swiped.
   */
  handleIndexChange = (index) => {
    // Get spot associated to the new card/index
    const spot = this.props.spots[index];

    const latLng = getSpotLocation(spot);

    // Center map on the spot keeping delta as it is
    this.setState(prevState => ({
      currentSpot: index,
      region: { ...prevState.region, ...latLng },
    }));
  };

  /**
   * @summary Fires every time the map stops panning. For us the map is a
   * controlled component, so we keep track of the map's region in our state.
   * @param {object} region - { latitude, longitude, latitudeDelta, longitudeDelta }
   */
  handleRegionChange = (region) => {
    this.setState({ region });
  };

  /**
   * @summary Fires every time a marker is pressed. We first re-center the map
   * on the spot's location and then use the index of the marker to scroll the
   * swiper and display the corresponding card.
   * @param {int} index - Index of the marker being pressed.
   */
  handleMarkerPess = (index) => {
    // Get spot associated to the new index and determine the new map's region
    const spot = this.props.spots[index];
    const latLng = getSpotLocation(spot);

    // Number of times we have to scroll the swiper to reach the desired card
    const offset = index - this.state.currentSpot;
    const swiper = this.refs.swiper; // eslint-disable-line

    // Center map on the spot
    this.setState({
      currentSpot: index,
      region: { ...this.state.region, ...latLng },
    }, () => {
      // After that, scroll the swiper to the desired card.
      swiper.scrollBy(offset, true);
    });
  }

  render() {
    const { cardComponent, onCardPress } = this.props;
    const { region, currentSpot } = this.state;

    const spots = this.props.filter(spot => spot.address);

    // Test fallback
    // throw new Error(401, 'bla');

    return (
      <Relative style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={region}
          moveOnMarkerPress={false}
          onRegionChangeComplete={this.handleRegionChange}
        >
          {spots.map((spot, index) => (
            <Marker
              key={spot.uuid}
              tracksViewChanges={false}
              coordinate={getSpotLocation(spot)}
              pinColor={Colors[currentSpot === index ? 'primaryGreen' : 'black']}
              onPress={() => {
                this.handleMarkerPess(index);
              }}
            />
          ))}
        </MapView>
        <Absolute>
          <Swiper
            ref="swiper" // eslint-disable-line
            loop={false}
            bounces
            showsPagination={false}
            containerStyle={{ height: 80 }}
            onIndexChanged={this.handleIndexChange}
          >
            {spots.map(spot => (
              <TouchableOpacity
                key={spot.uuid}
                onPress={() => {
                  onCardPress(spot.uuid);
                }}
                style={cardList.cardContainer}
              >
                {React.createElement(cardComponent, { spot })}
              </TouchableOpacity>
            ))}
          </Swiper>
        </Absolute>
      </Relative>
    );
  }
}

SpotsMap.propTypes = {
  // TODO
  /* initialLocation: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  }).isRequired, */
  spots: PropTypes.arrayOf(propType(spotFragment)),
  cardComponent: PropTypes.func.isRequired,
  onCardPress: PropTypes.func,
};

SpotsMap.defaultProps = {
  spots: [],
  onCardPress: () => {},
};

export default SpotsMap;
