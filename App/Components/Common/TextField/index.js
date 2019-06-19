import React from 'react';
import PropTypes from 'prop-types';
import { TextField as TextFieldMUI } from 'react-native-material-textfield';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';
import getInputPalette from '../../../Themes/Palettes';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const TextField = React.forwardRef(({
  theme,
  size,
  label,
  style,
  disabled,
  ...rest
}, ref) => {
  const {
    fontColor,
    baseColor,
    tintColor,
    disabledColor,
    errorColor,
    lineWidth,
  } = getInputPalette(theme); // string to be used Colors[string]

  return (
    <TextFieldMUI
      ref={ref}
      label={label}
      labelFontSize={Fonts.M.fontSize}
      labelTextStyle={{ fontFamily: Fonts.M.fontFamily }}
      labelHeight={1.5 * Fonts.M.fontSize}
      errorColor={Colors[errorColor]}
      animationDuration={150}
      lineWidth={lineWidth}
      disabledLineWidth={0}
      baseColor={Colors[baseColor]}
      tintColor={Colors[tintColor]}
      activeLineWidth={1}
      inputContainerPadding={14}
      disabled={disabled}
      style={{
        fontSize: Fonts[size].fontSize,
        fontWeight: 'normal',
        fontFamily: Fonts[size].fontFamily,
        marginTop: 8,
        color: disabled ? Colors[disabledColor] : Colors[fontColor],
        ...style,
      }}
      {...rest}
    />
  );
});

TextField.propTypes = {
  theme: PropTypes.oneOf(['white', 'black', 'transparent', 'mix']),
  size: PropTypes.oneOf(Object.keys(Fonts)),
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
