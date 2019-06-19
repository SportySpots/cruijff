import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components/native';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import Colors from '../../../Themes/Colors';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import SpotHeader from '../SpotHeader';
import SpotImage from '../SpotImage';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const SIZE = 80;
const BORDER_RADIUS = 4;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  height: ${SIZE}px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${BORDER_RADIUS};
  shadow-offset: 0px 1px;
  shadow-color: ${({ theme }) => theme.colors.shade};
  shadow-opacity: 0.8;
  elevation: 2;
  border: ${({ active }) => (!active ? 1 : 2.5)}px solid ${({ theme, active }) => (!active ? theme.colors.shade : theme.colors.actionYellow)};
  overflow: hidden;
`;
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1; /* take all remaining width */
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
      <FlexOne>
        <Block midHeight>
          <SpotHeader spot={spot} withDistance />
        </Block>
      </FlexOne>
      <SpotImage
        images={spot.images}
        height={SIZE}
        width={SIZE}
        style={imgStyle}
      />
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
