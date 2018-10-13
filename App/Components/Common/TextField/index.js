import React from 'react';
import PropTypes from 'prop-types';
import { TextField as TextFieldMUI } from 'react-native-material-textfield';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const TextField = ({
  fontColor,
  baseColor,
  tintColor,
  lineWidth,
  size,
  label,
  style,
  disabled,
  ...rest
}) => (
  <TextFieldMUI
    label={label}
    labelFontSize={Fonts.style.M.fontSize}
    labelTextStyle={{ fontFamily: Fonts.style.M.fontFamily }}
    labelHeight={1.5 * Fonts.style.M.fontSize}
    errorColor={Colors.red}
    animationDuration={150}
    lineWidth={lineWidth}
    disabledLineWidth={0}
    baseColor={baseColor}
    tintColor={tintColor}
    activeLineWidth={2}
    inputContainerPadding={14}
    disabled={disabled}
    style={{
      fontSize: Fonts.style[size].fontSize,
      fontWeight: 'normal',
      fontFamily: Fonts.style[size].fontFamily,
      // lineHeight: 1.3 * Fonts.style[size].fontSize,
      marginTop: 8, // the lower the margin the greater the line height
      // color: isWhiteTheme ? Colors.white : (disabled ? Colors.gray : Colors.black),
      color: disabled ? Colors.gray : fontColor,
      ...style,
    }}
    {...rest}
  />
);

TextField.propTypes = {
  fontColor: PropTypes.string,
  baseColor: PropTypes.string,
  tintColor: PropTypes.string,
  lineWidth: PropTypes.number,
  size: PropTypes.oneOf(Object.keys(Fonts.style)),
  label: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line
  disabled: PropTypes.bool,
  // Plus all props from react-native-material-textfield
};

TextField.defaultProps = {
  fontColor: Colors.black,
  baseColor: Colors.black,
  tintColor: Colors.primaryGreen,
  lineWidth: 1,
  size: 'M',
  label: '',
  style: {},
  disabled: false,
};

export default TextField;
