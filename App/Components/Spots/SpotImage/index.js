import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import getImageUrl from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const StyledImage = styled.Image`
  background-color: ${Colors.darkGreen};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotImage = ({ spot, style }) => {
  const image = spot.images.length > 0
    ? getImageUrl(spot.images[0].image)
    : 'https://raw.githubusercontent.com/SportySpots/cruijff/master/App/Images/game-placeholder.png';

  return (
    <StyledImage
      style={style}
      source={{ uri: image }}
    />
  );
};

SpotImage.propTypes = {
  spot: propType(spotFragment).isRequired,
  style: PropTypes.object, // eslint-disable-line
};

export default SpotImage;

/* border-bottom-left-radius: 8px;
 border-bottom-right-radius: 8px; */
