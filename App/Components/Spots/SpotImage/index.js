import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { getSpotImages } from '../../../utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotImage = ({
  images,
  height,
  width,
  style,
}) => {
  const imgs = getSpotImages({ images, height, width });

  console.log('IMG IMGIX', images[0]);
  console.log('IMG', imgs[0]);

  return (
    <Image
      source={{ uri: imgs[0] }}
      style={style}
    />
  );
};

SpotImage.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
    }),
  ),
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  style: PropTypes.object, // eslint-disable-line
};

SpotImage.defaultProps = {
  images: [],
};

export default SpotImage;
