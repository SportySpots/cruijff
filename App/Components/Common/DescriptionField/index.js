import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../I18n';
import TextField from '../TextField';
import getPalette from '../InputField/utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DescriptionField = ({
  theme,
  value,
  onChangeText,
  error,
  ...rest
}) => {
  const {
    fontColor,
    baseColor,
    tintColor,
    iconColor,
    lineWidth,
  } = getPalette(theme);

  return (
    <TextField
      value={value}
      onChangeText={onChangeText}
      label=""
      error={error}
      multiline
      placeholder={I18n.t('Write extra details about the game here')}
      fontColor={fontColor}
      baseColor={baseColor}
      tintColor={tintColor}
      iconColor={iconColor}
      lineWidth={lineWidth}
      {...rest}
    />
  );
};

DescriptionField.propTypes = {
  theme: PropTypes.oneOf(['white', 'black', 'transparent', 'mix']),
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  error: PropTypes.string,
};

DescriptionField.defaultProps = {
  theme: 'black',
  value: '',
  onChangeText: () => {},
  error: '',
};

export default DescriptionField;
