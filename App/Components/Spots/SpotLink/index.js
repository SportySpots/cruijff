import React from 'react';
import { propType } from 'graphql-anywhere';
import { showLocation } from 'react-native-map-link';
import I18n from '../../../I18n';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import Colors from '../../../Themes/Colors';
import Text from '../../Common/Text';
import Spacer from '../../Common/Spacer';
import Block from '../../Common/Block';
import getSpotLocation from './utils';

// -----------------------------------------------------------------------------
// AUX FUNCTIONS:
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
      {I18n.t('spotLink.link.anchor')}
    </Text>
  );

  return (
    <Block>
      <Text.M>{I18n.t('spotLink.error')}</Text.M>
      <Spacer size="M" />
      <Text>
        {I18n.t('spotLink.link.prefix')}
        {link}
        {I18n.t('spotLink.link.suffix')}
      </Text>
    </Block>
  );
};

SpotLink.propTypes = {
  spot: propType(spotFragment).isRequired,
};

export default SpotLink;
