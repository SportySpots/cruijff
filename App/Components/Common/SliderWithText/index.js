import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Slider from '../Slider';
import Spacer from '../Spacer';
import Text from '../Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FullHeight = styled.View`
  flex: 1; /* full height */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: replace Text.SM style={{ color: Colors.gray }} with Text.SM.gray
// (or something along those lines)
const SliderWithText = ({ label, description, ...rest }) => (
  <FullHeight>
    <Text.M>{label}</Text.M>
    {description}
    <Spacer size="L" />
    <Slider {...rest} />
  </FullHeight>
);

SliderWithText.propTypes = {
  label: PropTypes.string,
  description: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),
  // Plus all props from Slider
};

SliderWithText.defaultProps = {
  label: '',
  description: null,
};

export default SliderWithText;
