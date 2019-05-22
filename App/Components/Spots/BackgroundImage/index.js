import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import SpotImage from '../SpotImage';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.darkGreen};
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
  background-color: ${({ theme }) => theme.colors.black};
  opacity: 0.5;
  border-bottom-left-radius: ${({ top }) => (top ? 0 : 8)}px;
  border-bottom-right-radius: ${({ top }) => (top ? 0 : 8)}px;
  border-top-left-radius: ${({ top }) => (top ? 8 : 0)}px;
  border-top-right-radius: ${({ top }) => (top ? 8 : 0)}px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const BackgroundImage = ({
  images,
  height,
  width,
  top,
  withOverlay,
}) => {
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
      <SpotImage
        images={images}
        height={height}
        width={width}
        style={imgStyle}
      />
      {withOverlay && <Overlay top={top} />}
    </Container>
  );
};

BackgroundImage.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
    }),
  ),
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  top: PropTypes.bool,
  withOverlay: PropTypes.bool,
};

BackgroundImage.defaultProps = {
  images: [],
  top: false,
  withOverlay: true,
};

export default BackgroundImage;
