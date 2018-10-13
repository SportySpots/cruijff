import React from 'react';
import PropTypes from 'prop-types';
import { TextField as TextFieldMUI } from 'react-native-material-textfield';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const TextField = ({
  theme,
  size,
  label,
  style,
  disabled,
  ...rest
}) => {
  const isWhiteTheme = theme === 'white';
  console.log('SIZE', size);
  console.log('FONT SIZE', Fonts.style[size].fontSize);

  return (
    <TextFieldMUI
      label={label}
      labelFontSize={Fonts.style.M.fontSize}
      labelTextStyle={{ fontFamily: Fonts.style.M.fontFamily }}
      labelHeight={1.5 * Fonts.style.M.fontSize}
      errorColor={Colors.red}
      animationDuration={150}
      lineWidth={1}
      disabledLineWidth={0}
      baseColor={isWhiteTheme ? Colors.white : Colors.black}
      tintColor={isWhiteTheme ? Colors.white : Colors.primaryGreen}
      activeLineWidth={2}
      inputContainerPadding={14}
      disabled={disabled}
      style={{
        fontSize: Fonts.style[size].fontSize,
        fontWeight: 'normal',
        fontFamily: Fonts.style[size].fontFamily,
        lineHeight: 1.3 * Fonts.style[size].fontSize,
        marginTop: 8, // the lower the margin the greater the line height
        color: isWhiteTheme ? Colors.white : (disabled ? Colors.gray : Colors.black),
        ...style,
      }}
      {...rest}
    />
  );
};

TextField.propTypes = {
  theme: PropTypes.oneOf(['white', 'black']),
  size: PropTypes.oneOf(Object.keys(Fonts.style)),
  label: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line
  disabled: PropTypes.bool,
  // Plus all props from react-native-material-textfield
};

TextField.defaultProps = {
  theme: 'black',
  size: 'M',
  label: '',
  style: {},
  disabled: false,
};

export default TextField;
