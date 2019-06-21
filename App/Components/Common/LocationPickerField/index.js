import React from 'react';
import PropTypes from 'prop-types';
// import I18n from '../../../I18n';
import { CITIES, locationPropTypes } from '../../../Context/Location';
import InputField from '../InputField';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LocationPickerField = ({ value, onChange, ...rest }) => {
  const nCities = CITIES.length;

  return (
    <InputField
      comp="Dropdown"
      value={value ? CITIES.find(city => city.id === value).city : ''}
      data={CITIES.map(({ id, city }) => ({ label: city, value: id }))}
      onChangeText={(d) => {
        onChange(d.value);
      }}
      dropdownPosition={-nCities}
      itemCount={nCities}
      {...rest}
    />
  );
};

LocationPickerField.propTypes = {
  value: locationPropTypes.locationCity,
  onChange: PropTypes.func,
  // Plus all InputField props (theme, size)
};

LocationPickerField.defaultProps = {
  value: null,
  onChange: () => {},
};

export default LocationPickerField;
