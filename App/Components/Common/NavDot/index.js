import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
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
  background-color: ${({ theme, active }) => (
    !active ? theme.colors.white20 : theme.colors.actionYellow
  )}
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NavDot = ({ active }) => (
  <Row
    alignItems="center"
    justifyContent="center"
  >
    <Spacer row size="S" />
    <Circle active={active} />
    <Spacer row size="S" />
  </Row>
);

NavDot.propTypes = {
  active: PropTypes.bool,
};

NavDot.defaultProps = {
  active: false,
};

export default NavDot;
