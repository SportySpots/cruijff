import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { Image } from 'react-native';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import getImageUrl from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotImage = ({ spot, style }) => {
  const image = spot.images.length > 0
    ? getImageUrl(spot.images[0].image)
    : 'https://raw.githubusercontent.com/SportySpots/cruijff/master/App/Images/game-placeholder.png';

  console.log('SPOT_IMAGE image', image);

  return (
    <Image
      style={style}
      source={{ uri: image }}
    />
  );
};

SpotImage.propTypes = {
  spot: propType(spotFragment).isRequired,
  style: PropTypes.object, // eslint-disable-line
};

export default SpotImage;
