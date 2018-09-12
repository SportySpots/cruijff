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
  /* border: 1px solid green; */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Spacer = ({ orientation, size }) => {
  const pixels = getPixelsFromSize(size);

  return (
    <StyledView
      orientation={orientation}
      pixels={pixels}
    />
  );
};

Spacer.propTypes = {
  orientation: PropTypes.oneOf(['row', 'column']),
  size: PropTypes.oneOf(['S', 'M', 'L', 'XL', 'XXL']),
};

Spacer.defaultProps = {
  orientation: 'column',
  size: 'M',
};

export default Spacer;

