import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import getImageUrl from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotImage = ({ images, style }) => {
  const image = images.length > 0
    ? getImageUrl(images[0].image)
    : 'https://raw.githubusercontent.com/SportySpots/cruijff/master/App/Images/game-placeholder.png';

  return (
    <Image
      style={style}
      source={{ uri: image }}
    />
  );
};

SpotImage.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
    }),
  ),
  style: PropTypes.object, // eslint-disable-line
};

SpotImage.defaultProps = {
  images: [],
};

export default SpotImage;
