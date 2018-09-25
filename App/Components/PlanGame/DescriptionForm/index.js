import React from 'react';
import PropTypes from 'prop-types';
import DescriptionField from '../DescriptionField';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DescriptionForm = ({ description, onChange }) => (
  <DescriptionField
    value={description}
    characterRestriction={120}
    onChangeText={(value) => { onChange({ fieldName: 'sport', value }); }}
    // size="ML"
    theme="white"
  />
);

DescriptionForm.propTypes = {
  description: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

DescriptionForm.defaultProps = {
  onChange: () => {},
};

export default DescriptionForm;
