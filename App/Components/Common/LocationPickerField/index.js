import React from 'react';
import PropTypes from 'prop-types';
// import I18n from '../../../I18n';
import { CITIES, locationPropTypes } from '../../../Context/Location';
import InputField from '../InputField';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
// TODO: apply i18n
const data = CITIES.map(({ id, city }) => ({ label: city, value: id }));
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LocationPickerField = ({ value, onChange, ...rest }) => {
  const item = value ? data.find(d => (d.value === value.id)) : null;

  return (
    <InputField
      comp="Dropdown"
      value={item ? item.label : ''}
      data={data}
      onChangeText={(d) => {
        const location = CITIES.find(c => (c.id === d.value));
        onChange(location);
      }}
      {...rest}
    />
  );
};

LocationPickerField.propTypes = {
  value: locationPropTypes.location,
  onChange: PropTypes.func,
  // Plus all InputField props (theme, size)
};

LocationPickerField.defaultProps = {
  value: null,
  onChange: () => {},
};

export default LocationPickerField;
