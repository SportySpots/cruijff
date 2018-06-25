import React from 'react';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import styled from 'styled-components';
import ImageSwiper from '../ImageSwiper';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const SPOT_IMG = 'https://raw.githubusercontent.com/SportySpots/cruijff/graphql/App/SpotImages/spot-placeholder.png';
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  height: 200px;
`;
//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const getImageUrl = image => (
  image.startsWith('http') ? image : Config.SEEDORF_HOST + image
);
//------------------------------------------------------------------------------
const getSpotImages = spot => (
  spot && spot.images && spot.images.length > 0
    ? spot.images.map(({ image }) => getImageUrl(image))
    : [SPOT_IMG]
);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotImages = ({ spot }) => {
  const images = getSpotImages(spot);

  return (
    <Container>
      <ImageSwiper images={images} />
    </Container>
  );
};

SpotImages.propTypes = {
  spot: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default SpotImages;
