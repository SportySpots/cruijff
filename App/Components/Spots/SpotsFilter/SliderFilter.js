import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Slider from '../../../Components/Common/Slider';
import { FilterLabel, FilterDescription, RowVertical } from './style';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Spacer = styled.View`
  height: 15px;
`;
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
  <RowVertical style={{ height: 110 }}>
    <FilterLabel>{label}</FilterLabel>
    <FilterDescription>{description}</FilterDescription>
    <Spacer />
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
