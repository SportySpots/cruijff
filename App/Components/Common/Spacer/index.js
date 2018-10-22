import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getPixelsFromSize from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const StyledView = styled.View`
  background-color: transparent;
  width: ${({ row, pixels }) => (row ? `${pixels}px` : 'auto')};
  height: ${({ row, pixels }) => (!row ? `${pixels}px` : 'auto')};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Spacer = ({ row, size }) => {
  const pixels = getPixelsFromSize(size.toUpperCase());

  return (
    <StyledView
      row={row}
      pixels={pixels}
    />
  );
};

Spacer.propTypes = {
  row: PropTypes.bool,
  size: PropTypes.oneOf(['S', 'M', 'L', 'XL', 'XXL', 'XXL', 'XXXL']),
};

Spacer.defaultProps = {
  row: false,
  size: 'M',
};

export default Spacer;
