import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import SpotImage from '../SpotImage';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  background-color: ${Colors.darkGreen};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
//------------------------------------------------------------------------------
const Overlay = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  opacity: .5;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
//------------------------------------------------------------------------------
const imgStyle = {
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const BackgroundImage = ({ images }) => (
  <Container>
    <SpotImage images={images} style={imgStyle} />
    <Overlay />
  </Container>
);

BackgroundImage.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
    }),
  ),
};

BackgroundImage.defaultProps = {
  images: [],
};

export default BackgroundImage;
