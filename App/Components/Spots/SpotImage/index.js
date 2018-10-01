import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getImageUrl from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const StyledImage = styled.Image`
  flex: 1; /* full height */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotImage = ({ images, style }) => {
  const image = images.length > 0
    ? getImageUrl(images[0].image)
    : 'https://raw.githubusercontent.com/SportySpots/cruijff/master/App/Images/game-placeholder.png';

  return (
    <StyledImage
      source={{ uri: image }}
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
  style: PropTypes.object, // eslint-disable-line
};

SpotImage.defaultProps = {
  images: [],
};

export default SpotImage;
