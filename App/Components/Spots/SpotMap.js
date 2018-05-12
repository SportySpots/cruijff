import React from 'react';
import { Dimensions } from 'react-native';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker } from 'react-native-maps';
import { showLocation } from 'react-native-map-link';
import spotFragment from '../../GraphQL/Spots/Fragments/spot';
import Colors from '../../Themes/Colors';
import RoundButton from '../RoundButton';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.003;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
  right: 0;
  padding: 16px;
`;
// -----------------------------------------------------------------------------
const Flex = styled.View`
  flex-direction: row;
  flex: 1;
`;
// -----------------------------------------------------------------------------
const Spacer = styled.View`
  width: 6;
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
// -----------------------------------------------------------------------------
const handleLocationBtnPress = ({ latLng, title = '' }) => {
  showLocation({
    ...latLng,
    title,
    // force GoogleMaps to use the latLng from the query instead of the title
    googleForceLatLon: true,
  });
};
// -----------------------------------------------------------------------------
const handleDirectionsBtnPress = async ({ latLng, title = '' }) => {
  // Get user's position from navigator
  let position;
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 1000,
  };

  if ('geolocation' in navigator) {
    try {
      position = await getCurrentPosition(options);
    } catch (exc) {
      console.log("Oops, we couldn't get your position! Make sure you GPS is enabled ;)", exc);
    }
  } else {
    console.log('Geolocation is not available');
  }

  // Show directions FROM the user's current position (if available) TO the
  // spot's location
  showLocation({
    sourceLatitude: (position && position.coords && position.coords.latitude) || undefined,
    sourceLongitude: (position && position.coords && position.coords.longitude) || undefined,
    ...latLng,
    title,
    // force GoogleMaps to use the latLng from the query instead of the title
    googleForceLatLon: true,
  });
};
// -----------------------------------------------------------------------------
// COMPONENT:
// -----------------------------------------------------------------------------
/**
 * @summary Renders a map centered on the spot's location. Two buttons are
 * displayed at the bottom of the map, the first one takes the user to google
 * maps and shows the spot's location; the second takes the user to google maps
 * and provides directions to the spot based on the user's current position.
 */
const SpotMap = ({ spot }) => {
  // Get sport location
  const latLng = getSpotLocation(spot);

  if (!latLng.latitude || !latLng.longitude) {
    return null;
  }

  // Test fallback
  // throw new Error(401, 'bla');

  // Define map region centered on the spot
  const region = {
    ...latLng,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  return (
    <Relative>
      <MapView style={{ height: 150 }} initialRegion={region}>
        <Marker coordinate={latLng} pinColor={Colors.primaryGreen} />
      </MapView>
      <Absolute>
        <Flex>
          <RoundButton
            onPress={() => {
              handleDirectionsBtnPress({ latLng, title: spot.name });
            }}
          >
            <Icon name="directions" size={24} color={Colors.primaryGreen} />
          </RoundButton>
          <Spacer />
          <RoundButton
            onPress={() => {
              handleLocationBtnPress({ latLng, title: spot.name });
            }}
          >
            <Icon name="map" size={24} color={Colors.primaryGreen} />
          </RoundButton>
        </Flex>
      </Absolute>
    </Relative>
  );
};

SpotMap.propTypes = {
  spot: propType(spotFragment).isRequired,
};

export default SpotMap;
