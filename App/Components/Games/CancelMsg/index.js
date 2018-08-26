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
  hasError,
  errorMsg,
}) => (
  <TextField
    value={value}
    onChangeText={onChangeText}
    maxLength={120}
    label={I18n.t('Cancellation reason')}
    hasError={hasError}
    errorMsg={errorMsg}
    displayCounter
    multiline
  />
);

CancelMsg.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  hasError: PropTypes.bool,
  errorMsg: PropTypes.string,
};

CancelMsg.defaultProps = {
  value: '',
  onChangeText: () => {},
  hasError: false,
  errorMsg: '',
};

export default CancelMsg;
