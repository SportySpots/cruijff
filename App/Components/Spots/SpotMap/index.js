import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { propType } from 'graphql-anywhere';
import Secrets from 'react-native-config';
import styled from 'styled-components';
import GoogleStaticMap from 'react-native-google-static-map';
import { showLocation } from 'react-native-map-link';
import Colors from '../../../Themes/Colors';
import spotMapFragment from '../../../GraphQL/Spots/Fragments/spotMap';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import RoundButton from '../../Common/RoundButton';

// -----------------------------------------------------------------------------
// CONSTANTS:
// -----------------------------------------------------------------------------
const { width: windowWidth } = Dimensions.get('window');
// -----------------------------------------------------------------------------
const { GOOGLE_MAPS_IOS_API_KEY, GOOGLE_MAPS_ANDROID_API_KEY } = Secrets;
const GOOGLE_MAPS_API_KEY =
  Platform.OS === 'ios' ? GOOGLE_MAPS_IOS_API_KEY : GOOGLE_MAPS_ANDROID_API_KEY;
// -----------------------------------------------------------------------------
// STYLE:
// -----------------------------------------------------------------------------
const Relative = styled.View`
  position: relative;
  margin: 0;
  background-color: ${Colors.lightSkyBlue}
`;
// -----------------------------------------------------------------------------
const Absolute = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
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
    console.log(
      'Oops, we couldn\'t get your position! Make sure you GPS is enabled ;)',
      exc,
    );
  }

  // Show directions FROM the user's current position (if available) TO the
  // spot's location
  showLocation({
    sourceLatitude:
      (position && position.coords && position.coords.latitude) || undefined,
    sourceLongitude:
      (position && position.coords && position.coords.longitude) || undefined,
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

  return (
    <Relative>
      <GoogleStaticMap
        latitude={latLng.latitude.toString()}
        longitude={latLng.longitude.toString()}
        zoom={13}
        size={{ width: parseInt(windowWidth, 10), height: 150 }}
        apiKey={GOOGLE_MAPS_API_KEY}
      />
      <Absolute>
        <Block>
          <Row>
            <RoundButton
              status="translucid"
              iconName="directions"
              onPress={() => {
                handleLocationBtnPress({ latLng, title: spot.name });
              }}
            />
            <Spacer orientation="row" size="M" />
            <RoundButton
              status="translucid"
              iconName="map-marker"
              onPress={() => {
                handleDirectionsBtnPress({ latLng, title: spot.name });
              }}
            />
          </Row>
        </Block>
      </Absolute>
    </Relative>
  );
};

SpotMap.propTypes = {
  spot: propType(spotMapFragment).isRequired,
};

export default SpotMap;
