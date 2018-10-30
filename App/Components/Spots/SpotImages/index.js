import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImageSwiper from '../../Common/ImageSwiper';
import { getSpotImages } from '../../../utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  height: 200px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotImages = ({ images }) => {
  const imgs = getSpotImages(images);

  return (
    <Container>
      <ImageSwiper images={imgs} />
    </Container>
  );
};

SpotImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
    }),
  ),
};

SpotImages.defaultProps = {
  images: [],
};

export default SpotImages;
