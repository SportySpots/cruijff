import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import getPixelsFromSize from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const StyledView = styled.View`
  background-color: ${({ theme }) => theme.colors.transparent};
  width: ${({ row, pixels }) => (row ? `${pixels}px` : 'auto')};
  height: ${({ row, pixels }) => (!row ? `${pixels}px` : 'auto')};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Spacer = ({ row, size }) => (
  <StyledView
    row={row}
    pixels={getPixelsFromSize(size)}
  />
);

Spacer.propTypes = {
  row: PropTypes.bool,
  size: PropTypes.oneOf(['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL', 'XXL', 'XXXL']),
};

Spacer.defaultProps = {
  row: false,
  size: 'M',
};

export default Spacer;
