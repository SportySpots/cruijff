import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Slider from '../Slider';
import Spacer from '../Spacer';
import Text from '../Text';
import { FilterDescription } from '../../Spots/SpotsFilter/style';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1; /* full height */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
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
    <FilterDescription>{description}</FilterDescription>
    <Spacer direction="column" size="L" />
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
