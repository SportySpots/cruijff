import React from 'react';
import PropTypes from 'prop-types';
import Row from '../Row';
import NavDot from '../NavDot';
import range from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NavDots = ({ count, activeIndex }) => (
  <Row
    alignItems="center"
    justifyContent="center"
  >
    {range(count).map(i => (
      <NavDot
        key={i}
        active={i === activeIndex}
      />
    ))}
  </Row>
);

NavDots.propTypes = {
  count: PropTypes.number,
  activeIndex: PropTypes.number,
};

NavDots.defaultProps = {
  count: 3,
  activeIndex: 0,
};

export default NavDots;
