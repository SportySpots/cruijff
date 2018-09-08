import React from 'react';
import PropTypes from 'prop-types';
import Slider from '../Slider';
import Spacer from '../Spacer';
import { FilterLabel, FilterDescription, RowVertical } from '../../Spots/SpotsFilter/style';

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
  <RowVertical>
    <FilterLabel>{label}</FilterLabel>
    <FilterDescription>{description}</FilterDescription>
    <Spacer direction="column" size="L" />
    <Slider
      value={(value / (max - min))}
      onChange={val => onChange(val * (max - min))}
    />
  </RowVertical>
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
