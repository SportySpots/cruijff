import React from 'react';
import PropTypes from 'prop-types';
import DescriptionField from '../../Common/DescriptionField';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DescriptionSlide = ({ description, descriptionMaxChars, onChange }) => (
  <DescriptionField
    testID="description"
    value={description}
    characterRestriction={descriptionMaxChars}
    onChangeText={(value) => { onChange({ fieldName: 'description', value }); }}
    theme="white"
  />
);

DescriptionSlide.propTypes = {
  description: PropTypes.string.isRequired,
  descriptionMaxChars: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

DescriptionSlide.defaultProps = {
  onChange: () => {},
};

export default DescriptionSlide;