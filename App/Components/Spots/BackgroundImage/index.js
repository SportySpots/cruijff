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
  border-bottom-left-radius: ${({ top }) => (top ? 0 : 8)}px;
  border-bottom-right-radius: ${({ top }) => (top ? 0 : 8)}px;
  border-top-left-radius: ${({ top }) => (top ? 8 : 0)}px;
  border-top-right-radius: ${({ top }) => (top ? 8 : 0)}px;
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
  border-bottom-left-radius: ${({ top }) => (top ? 0 : 8)}px;
  border-bottom-right-radius: ${({ top }) => (top ? 0 : 8)}px;
  border-top-left-radius: ${({ top }) => (top ? 8 : 0)}px;
  border-top-right-radius: ${({ top }) => (top ? 8 : 0)}px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const BackgroundImage = ({ images, top }) => {
  const imgStyle = {
    flex: 1,
    borderBottomLeftRadius: top ? 0 : 8,
    borderBottomRightRadius: top ? 0 : 8,
    borderTopLeftRadius: top ? 8 : 0,
    borderTopRightRadius: top ? 8 : 0,
    overflow: 'hidden',
  };

  return (
    <Container top={top}>
      <SpotImage images={images} style={imgStyle} />
      <Overlay top={top} />
    </Container>
  );
}

BackgroundImage.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
    }),
  ),
  top: PropTypes.bool,
};

BackgroundImage.defaultProps = {
  images: [],
  top: false,
};

export default BackgroundImage;
