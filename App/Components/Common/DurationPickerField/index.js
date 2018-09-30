import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../I18n/index';
import Dropdown from '../Dropdown';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const DURATION_OPTIONS = [
  { number: '15', unit: 'minutes', minutes: 15 },
  { number: '30', unit: 'minutes', minutes: 30 },
  { number: '45', unit: 'minutes', minutes: 45 },
  { number: '60', unit: 'minutes', minutes: 60 },
  { number: '75', unit: 'minutes', minutes: 75 },
  { number: '90', unit: 'minutes', minutes: 90 },
  { number: '2', unit: 'hours', minutes: 120 },
  { number: '2,5', unit: 'hours', minutes: 150 },
  { number: '3', unit: 'hours', minutes: 180 },
  { number: '4', unit: 'hours', minutes: 240 },
  { unit: 'Undetermined' },
];
//------------------------------------------------------------------------------
const data = DURATION_OPTIONS.map(({ number, unit }) => (
  { value: `${number || ''} ${I18n.t(unit)}` }
));
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DurationPickerField = ({ value, onChange, ...rest }) => (
  <Dropdown
    label=""
    value={value}
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
