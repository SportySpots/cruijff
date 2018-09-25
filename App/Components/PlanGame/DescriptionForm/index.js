import React from 'react';
import PropTypes from 'prop-types';
import Spacer from '../../Common/Spacer';
import DescriptionField from '../DescriptionField';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DescriptionForm = ({ description, onChange }) => [
  <Spacer key="sport-spacer" size="XL" />,
  <DescriptionField
    key="description"
    value={description}
    characterRestriction={120}
    onChangeText={(value) => { onChange({ fieldName: 'sport', value }); }}
    // size="ML"
    theme="white"
  />,
];

DescriptionForm.propTypes = {
  description: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

DescriptionForm.defaultProps = {
  onChange: () => {},
};

export default DescriptionForm;
