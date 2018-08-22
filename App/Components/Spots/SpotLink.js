import React from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import { showLocation } from 'react-native-map-link';
import I18n from '../../I18n';
import spotFragment from '../../GraphQL/Spots/Fragments/spot';
import Colors from '../../Themes/Colors';
import Text from '../../Components/Common/Text';

// -----------------------------------------------------------------------------
// STYLE:
// -----------------------------------------------------------------------------
const Block = styled.View`
  padding: 16px;
`;
// -----------------------------------------------------------------------------
const Spacer = styled.View`
  height: 7;
`;
// -----------------------------------------------------------------------------
// AUX FUNCTIONS:
// -----------------------------------------------------------------------------
const getSpotLocation = spot => ({
  latitude: spot && spot.address && spot.address.lat,
  longitude: spot && spot.address && spot.address.lng,
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
// COMPONENT:
// -----------------------------------------------------------------------------
/**
 * @summary Renders link to spot's location in case map crashes.
 */
const SpotLink = ({ spot }) => {
  // Get sport location
  const latLng = getSpotLocation(spot);

  if (!latLng.latitude || !latLng.longitude) {
    return null;
  }

  const link = (
    <Text
      style={{ color: Colors.actionBlue }}
      onPress={() => {
        handleLocationBtnPress({ latLng, title: spot.name });
      }}
    >
      {I18n.t('here')}
    </Text>
  );

  return (
    <Block>
      <Text.M>{I18n.t("Oops! The map couldn't be loaded :(")}</Text.M>
      <Spacer />
      <Text>
        {I18n.t('Click')} {link}{' '}
        {I18n.t("to see the spot's location on Google Maps")}
      </Text>
    </Block>
  );
};

SpotLink.propTypes = {
  spot: propType(spotFragment).isRequired,
};

export default SpotLink;
