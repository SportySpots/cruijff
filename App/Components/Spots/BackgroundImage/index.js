import React from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
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
  flex: 1,
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const BackgroundImage = ({ spot }) => (
  <Container>
    <SpotImage spot={spot} style={imgStyle} />
    <Overlay />
  </Container>
);

BackgroundImage.propTypes = {
  spot: propType(spotFragment).isRequired,
};

export default BackgroundImage;
