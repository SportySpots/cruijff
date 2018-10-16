import React from 'react';
import PropTypes from 'prop-types';
import DescriptionField from '../DescriptionField';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DescriptionForm = ({ description, descriptionMaxChars, onChange }) => (
  <DescriptionField
    value={description}
    characterRestriction={descriptionMaxChars}
    onChangeText={(value) => { onChange({ fieldName: 'description', value }); }}
    theme="white"
  />
);

DescriptionForm.propTypes = {
  description: PropTypes.string.isRequired,
  descriptionMaxChars: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

DescriptionForm.defaultProps = {
  onChange: () => {},
};

export default DescriptionForm;
