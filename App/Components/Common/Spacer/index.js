import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getPixelsFromSize from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const StyledView = styled.View`
  background-color: transparent;
  width: ${({ direction, pixels }) => (direction === 'row' ? `${pixels}px` : 'auto')};
  height: ${({ direction, pixels }) => (direction === 'column' ? `${pixels}px` : 'auto')};
  /* border: 1px solid green; */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Spacer = ({ direction, size }) => {
  const pixels = getPixelsFromSize(size);

  return (
    <StyledView
      direction={direction}
      pixels={pixels}
    />
  );
};

Spacer.propTypes = {
  direction: PropTypes.oneOf(['row', 'column']),
  size: PropTypes.oneOf(['S', 'M', 'L']),
};

Spacer.defaultProps = {
  direction: 'column',
  size: 'M',
};

export default Spacer;

