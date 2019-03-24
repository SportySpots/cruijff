import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../I18n';
import InputField from '../InputField';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const DURATION_OPTIONS = [
  { number: '15', unit: 'minutes', value: 15 },
  { number: '30', unit: 'minutes', value: 30 },
  { number: '45', unit: 'minutes', value: 45 },
  { number: '60', unit: 'minutes', value: 60 },
  { number: '75', unit: 'minutes', value: 75 },
  { number: '90', unit: 'minutes', value: 90 },
  { number: '2', unit: 'hours', value: 120 },
  { number: '2,5', unit: 'hours', value: 150 },
  { number: '3', unit: 'hours', value: 180 },
  { number: '4', unit: 'hours', value: 240 },
  // { unit: 'Undetermined', value: '' },
];
//------------------------------------------------------------------------------
const data = DURATION_OPTIONS.map(({ number, unit, value }) => {
  const i18nUnit = I18n.t(`durationPickerField.${unit}`);
  return { label: number ? `${number} ${i18nUnit}` : i18nUnit, value };
});
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DurationPickerField = ({ value, onChange, ...rest }) => {
  const item = value ? data.find(d => (d.value === value)) : null;

  return (
    <InputField
      comp="Dropdown"
      value={item ? item.label : ''}
      data={data}
      onChangeText={(duration) => { onChange(duration.value); }}
      {...rest}
    />
  );
};

DurationPickerField.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onChange: PropTypes.func,
  // Plus all InputField props (theme, size)
};

DurationPickerField.defaultProps = {
  value: null,
  onChange: () => {},
};

export default DurationPickerField;
