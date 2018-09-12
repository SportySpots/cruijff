import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Slider from '../Slider';
import Spacer from '../Spacer';
import Text from '../Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1; /* full height */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: replace Text.SM style={{ color: Colors.gray }} with Text.SM.gray
// (or something along those lines)
const SliderWithText = ({
  max,
  min,
  value,
  onChange,
  label,
  description,
}) => (
  <Container>
    <Text.M>{label}</Text.M>
    <Text.SM style={{ color: Colors.gray }}>
      {description}
    </Text.SM>
    <Spacer orientation="column" size="L" />
    <Slider
      value={(value / (max - min))}
      onChange={val => onChange(val * (max - min))}
    />
  </Container>
);

SliderWithText.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string,
  description: PropTypes.string,
};

SliderWithText.defaultProps = {
  max: 20,
  min: 1,
  onChange: () => {},
  label: '',
  description: '',
};

export default SliderWithText;
