import React from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import getImageUrl from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
//------------------------------------------------------------------------------
const Img = styled.Image`
  flex: 1;
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
// COMPONENT:
//------------------------------------------------------------------------------
const BackgroundImage = ({ spot }) => {
  const image = spot.images.length > 0
    ? getImageUrl(spot.images[0].image)
    : 'https://raw.githubusercontent.com/SportySpots/cruijff/master/App/Images/game-placeholder.png';

  return (
    <Container>
      <Img source={{ uri: image }} />
      <Overlay />
    </Container>
  );
};

BackgroundImage.propTypes = {
  spot: propType(spotFragment).isRequired,
};

export default BackgroundImage;
