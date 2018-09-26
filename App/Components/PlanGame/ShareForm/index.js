import React from 'react';
import PropTypes from 'prop-types';
import Spacer from '../../Common/Spacer';
import DescriptionField from '../DescriptionField';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ShareForm = ({ share, onChange }) => [
  <Spacer key="sport-spacer" size="XL" />,
  <DescriptionField
    key="share"
    value={share}
    characterRestriction={120}
    onChangeText={(value) => { onChange({ fieldName: 'share', value }); }}
    theme="white"
  />,
];

ShareForm.propTypes = {
  share: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

ShareForm.defaultProps = {
  onChange: () => {},
};

export default ShareForm;
