import React from 'react';
import PropTypes from 'prop-types';
import Svg, { G, Path, Polygon } from 'react-native-svg';

const Logo = ({ scale }) => (
  <Svg
    width={88 * scale}
    height={88 * scale}
    viewBox="0 0 79 79"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G id="Onboarding" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <Path
        d="M4.8,8.21565038e-15 L74.2,8.21565038e-15 C76.8509668,7.72867568e-15 79,2.1490332 79,4.8 L79,74.2 C79,76.8509668 76.8509668,79 74.2,79 L4.8,79 C2.1490332,79 -2.33988546e-15,76.8509668 -2.66453526e-15,74.2 L0,4.8 C-3.24649801e-16,2.1490332 2.1490332,6.03808982e-15 4.8,5.55111512e-15 Z"
        id="Rectangle-6"
        fill="#07D654"
      />
      <Polygon id="Rectangle" fill="#FFFFFF" points="14 11 65 11 65 68 14 68" />
      <Polygon id="Rectangle-3-Copy-5" fill="#248232" points="0 45 53 45 53 56 0 56" />
      <Polygon id="Rectangle-3-Copy-4" fill="#248232" points="26 22 79 22 79 33 26 33" />
      <Polygon id="Rectangle-2" fill="#2BA84A" points="0 11 14 11 14 68 0 68" />
      <Polygon id="Rectangle-2-Copy-2" fill="#2BA84A" points="65 11 79 11 79 68 65 68" />
      <Polygon id="Rectangle-3-Copy-2" points="0 68 79 68 79 79 0 79" />
      <Polygon
        id="Rectangle-3-Copy"
        fill="#248232"
        points="14 8.21565038e-15 65 8.21565038e-15 65 11 14 11"
      />
      <Polygon id="Rectangle-3-Copy-3" fill="#248232" points="14 68 65 68 65 79 14 79" />
    </G>
  </Svg>
);

Logo.propTypes = {
  scale: PropTypes.number,
};

Logo.defaultProps = {
  scale: 1,
};

export default Logo;
