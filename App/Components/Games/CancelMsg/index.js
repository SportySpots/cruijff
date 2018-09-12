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
  ...rest
}) => (
  <TextField
    value={value}
    onChangeText={onChangeText}
    label={I18n.t('Cancellation reason')}
    error={error}
    multiline
    placeholder={I18n.t('Write here why the activity does not continue')}
    {...rest}
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
