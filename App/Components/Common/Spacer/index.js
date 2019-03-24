import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import getPixelsFromSize from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: get color from theme
const StyledView = styled.View`
  background-color: ${Colors.transparent};
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
  size: PropTypes.oneOf(['S', 'M', 'ML', 'L', 'XL', 'XXL', 'XXL', 'XXXL']),
};

Spacer.defaultProps = {
  row: false,
  size: 'M',
};

export default Spacer;
