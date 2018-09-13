import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../I18n/index';
import Dropdown from '../Dropdown';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const DURATION_OPTIONS = [
  { value: '15', unit: 'minutes' },
  { value: '30', unit: 'minutes' },
  { value: '45', unit: 'minutes' },
  { value: '60', unit: 'minutes' },
  { value: '75', unit: 'minutes' },
  { value: '90', unit: 'minutes' },
  { value: '2', unit: 'hours' },
  { value: '2,5', unit: 'hours' },
  { value: '3', unit: 'hours' },
  { value: '4', unit: 'hours' },
  { value: '3', unit: 'hours' },
  { unit: 'Undetermined' },
];
//------------------------------------------------------------------------------
const data = DURATION_OPTIONS.map(({ value, unit }) => (
  { value: `${value || ''} ${I18n.t(unit)}` }
));
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DurationPickerField = ({ value, onChange, ...rest }) => (
  <Dropdown
    label=""
    data={data}
    onChangeText={(duration) => { onChange(duration); }}
    {...rest}
  />
);

DurationPickerField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  // Plus all InputField props (theme, size)
};

DurationPickerField.defaultProps = {
  value: '',
  onChange: () => {},
};

export default DurationPickerField;
