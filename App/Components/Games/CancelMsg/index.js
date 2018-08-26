import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../../Common/TextField';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const CancelMsg = ({ value, onChangeText }) => (
  <TextField
    value={value}
    onChangeText={onChangeText}
    maxLength={120}
    displayCounter
    multiline
  />
);

CancelMsg.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

CancelMsg.defaultProps = {
  value: '',
  onChangeText: () => {},
};

export default CancelMsg;
