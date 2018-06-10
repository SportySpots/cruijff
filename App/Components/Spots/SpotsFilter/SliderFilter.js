import React from 'react';
import PropTypes from 'prop-types';
import Slider from '../../../Components/Slider';
import { FilterLabel, FilterDescription, RowVertical } from './style';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SliderFilter = ({
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
    <Slider
      value={(value / (max - min))}
      onChange={val => onChange(val * (max - min))}
    />
  </RowVertical>
);

SliderFilter.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string,
  description: PropTypes.string,
};

SliderFilter.defaultProps = {
  max: 20,
  min: 1,
  onChange: () => {},
  label: '',
  description: '',
};

export default SliderFilter;
