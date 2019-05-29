import React from 'react';
import { propType } from 'graphql-anywhere';
import I18n from '../../../I18n';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import Text from '../../Common/Text';
import Spacer from '../../Common/Spacer';
import Block from '../../Common/Block';
import { getSpotLocation, openGoogleMapsLocation } from '../utils';

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
      color="actionBlue"
      onPress={async () => {
        await openGoogleMapsLocation({ latLng, title: spot.name });
      }}
    >
      {I18n.t('spotLink.link.anchor')}
    </Text>
  );

  return (
    <Block>
      <Text size="M">
        {I18n.t('spotLink.error')}
      </Text>
      <Spacer size="M" />
      <Text>
        {I18n.t('spotLink.link.prefix')}
        &nbsp;
        {link}
        &nbsp;
        {I18n.t('spotLink.link.suffix')}
      </Text>
    </Block>
  );
};

SpotLink.propTypes = {
  spot: propType(spotFragment).isRequired,
};

export default SpotLink;
