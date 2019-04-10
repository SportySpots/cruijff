import React from 'react';
import { propType } from 'graphql-anywhere';
import I18n from '../../../I18n';
import spotDetailsFragment from '../../../GraphQL/Spots/Fragments/spotDetails';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Divider from '../../Common/Divider';
import Text from '../../Common/Text';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotAmenities = ({ spot }) => {
  const amenities = (
    spot.amenities
    && spot.amenities.length > 0
    && spot.amenities[0]
    && spot.amenities[0].data
  ) || {};

  const array = [];

  Object.keys(amenities).forEach((key) => {
    array.push([
      <Block key={key} midHeight>
        <Row>
          <Text size="M">{I18n.t(key)}</Text>
          <Text size="M" bold>{amenities[key]}</Text>
        </Row>
      </Block>,
      <Divider key={`${key}-divider`} />,
    ]);
  });

  return array;
};

SpotAmenities.propTypes = {
  spot: propType(spotDetailsFragment).isRequired,
};

export default SpotAmenities;
