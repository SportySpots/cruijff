import React from 'react';
import { propType } from 'graphql-anywhere';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import BackgroundImage from '../BackgroundImage';
import SpotHeader from '../SpotHeader';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const CARD_HEIGHT = 240;
const CARD_WIDTH = Dimensions.get('window').width; // aprox, we are not considering the padding from the parent container
const FOOTER_HEIGHT = 80;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Outer = styled.View`
  display: flex;
  height: ${CARD_HEIGHT}px;
  border-radius: 8px;
  shadow-offset: 1px 1px;
  shadow-color: ${Colors.shade};
  shadow-opacity: 0.8;
  elevation: 2;
`;
//------------------------------------------------------------------------------
const Top = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
const Bottom = styled.View`
  height: ${FOOTER_HEIGHT}px;
  background-color: ${Colors.white};
  padding: 16px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotListCard = ({ spot }) => (
  <Outer>
    <Top>
      <BackgroundImage
        images={spot.images}
        height={CARD_HEIGHT - FOOTER_HEIGHT}
        width={CARD_WIDTH}
        top
        withOverlay={false}
      />
    </Top>
    <Bottom>
      <SpotHeader
        spot={spot}
        withDistance
        withGames
      />
    </Bottom>
  </Outer>
);

SpotListCard.propTypes = {
  spot: propType(spotFragment).isRequired,
};

export default SpotListCard;
