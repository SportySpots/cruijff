import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../I18n';
import TextField from '../../Common/TextField';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DescriptionField = ({
  value,
  onChangeText,
  error,
  ...rest
}) => (
  <TextField
    value={value}
    onChangeText={onChangeText}
    label=""
    error={error}
    multiline
    placeholder={I18n.t('Write here why the activity does not continue')}
    {...rest}
  />
);

DescriptionField.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  error: PropTypes.string,
};

DescriptionField.defaultProps = {
  value: '',
  onChangeText: () => {},
  error: '',
};

export default DescriptionField;
