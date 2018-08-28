import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../I18n';
import TextField from '../../Common/TextField';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const CancelMsg = ({
  value,
  onChangeText,
  error,
}) => (
  <TextField
    value={value}
    onChangeText={onChangeText}
    characterRestriction={120}
    label={I18n.t('Cancellation reason')}
    error={error}
    multiline
  />
);

CancelMsg.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  error: PropTypes.string,
};

CancelMsg.defaultProps = {
  value: '',
  onChangeText: () => {},
  error: '',
};

export default CancelMsg;
