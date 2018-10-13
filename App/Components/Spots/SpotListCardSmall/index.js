import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
// import Rating from '../../Common/Rating';
import Text from '../../Common/Text';
import Row from '../../Common/Row';
import Block from '../../Common/Block';
// import DotSpacer from '../../Common/DotSpacer';
import SpotListCardSmallBody from '../SpotListCardSmallBody';
import SpotImage from '../SpotImage';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const SIZE = 80;
const BORDER_RADIUS = 2;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  height: ${SIZE}px;
  background-color: ${Colors.white};
  border-radius: ${BORDER_RADIUS};
  shadow-offset: 1px 1px;
  shadow-color: ${Colors.shade};
  shadow-opacity: 0.8;
  elevation: 2;
  border: ${({ active }) => (!active ? 1 : 1.5)}px solid ${({ active }) => (!active ? Colors.shade : Colors.primaryGreen)};
  overflow: hidden;
`;
//------------------------------------------------------------------------------
const FlexGrow = styled.View`
  flex-grow: 1; /* take all remaining width */
`;
//------------------------------------------------------------------------------
const imgStyle = {
  height: SIZE,
  width: SIZE,
  backgroundColor: Colors.darkGreen,
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotListCardSmall = ({ spot, active }) => (
  <Container active={active}>
    <Row>
      <FlexGrow>
        <SpotListCardSmallBody spot={spot} />
      </FlexGrow>
      <SpotImage images={spot.images} style={imgStyle} />
    </Row>
  </Container>
);

SpotListCardSmall.propTypes = {
  spot: propType(spotFragment).isRequired,
  active: PropTypes.bool,
};

SpotListCardSmall.defaultProps = {
  active: false,
};

export default SpotListCardSmall;
