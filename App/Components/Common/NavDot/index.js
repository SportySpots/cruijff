import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Row from '../Row';
import Spacer from '../Spacer';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const SIZE = 10;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Circle = styled.View`
  width: ${SIZE};
  height: ${SIZE};
  border-radius: ${SIZE};
  background-color: ${({ active }) => (!active ? Colors.white20 : Colors.actionYellow)}
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NavDot = ({ active }) => (
  <Row
    alignItems="center"
    justifyContent="center"
  >
    <Spacer orientation="row" size="S" />
    <Circle active={active} />
    <Spacer orientation="row" size="S" />
  </Row>
);

NavDot.propTypes = {
  active: PropTypes.bool,
};

NavDot.defaultProps = {
  active: false,
};

export default NavDot;
