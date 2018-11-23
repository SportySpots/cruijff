import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import ImageSwiper from '../../Common/ImageSwiper';
import { getSpotImages } from '../../../utils';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const HEIGHT = 200;
const WIDTH = Dimensions.get('window').width;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  height: ${HEIGHT}px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotImages = ({ images }) => {
  const imgs = getSpotImages({ images, height: HEIGHT, width: WIDTH });

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
