import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getPixelsFromSize from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const StyledView = styled.View`
  background-color: transparent;
  width: ${({ orientation, pixels }) => (orientation === 'row' ? `${pixels}px` : 'auto')};
  height: ${({ orientation, pixels }) => (orientation === 'column' ? `${pixels}px` : 'auto')};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: remove orientation, pass row as a bool prop instead
const Spacer = ({ orientation, size }) => {
  const pixels = getPixelsFromSize(size.toUpperCase());

  return (
    <StyledView
      orientation={orientation}
      pixels={pixels}
    />
  );
};

Spacer.propTypes = {
  orientation: PropTypes.oneOf(['row', 'column']),
  size: PropTypes.oneOf(['S', 'M', 'L', 'XL', 'XXL', 'XXL', 'XXXL']),
};

Spacer.defaultProps = {
  orientation: 'column',
  size: 'M',
};

export default Spacer;

