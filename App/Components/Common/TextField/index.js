import React from 'react';
import PropTypes from 'prop-types';
import { TextField as TextFieldMUI } from 'react-native-material-textfield';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';
import getInputPalette from '../../../Themes/Palettes';

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
  const {
    fontColor,
    baseColor,
    tintColor,
    lineWidth,
  } = getInputPalette(theme);

  return (
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
        marginTop: 8,
        color: disabled ? Colors.gray : fontColor,
        ...style,
      }}
      {...rest}
    />
  );
};

TextField.propTypes = {
  theme: PropTypes.oneOf(['white', 'black', 'transparent', 'mix']),
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
