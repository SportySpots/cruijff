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
    label={I18n.t('cancelMsg.label')}
    error={error}
    multiline
    placeholder={I18n.t('cancelMsg.placeholder')}
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
