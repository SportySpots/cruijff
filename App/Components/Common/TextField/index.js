import React from 'react';
import PropTypes from 'prop-types';
import { TextField as TextFieldMUI } from 'react-native-material-textfield';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const TextField = ({ theme, size, ...rest }) => {
  const isWhiteTheme = theme === 'white';

  return (
    <TextFieldMUI
      labelFontSize={Fonts.style.M.fontSize}
      labelHeight={Fonts.style.M.fontSize * 1.5}
      labelTextStyle={{ fontFamily: Fonts.style.M.fontFamily }}
      errorColor={Colors.red}
      animationDuration={150}
      lineWidth={1}
      baseColor={isWhiteTheme ? Colors.white : Colors.black}
      tintColor={isWhiteTheme ? Colors.white : Colors.primaryGreen}
      activeLineWidth={2}
      style={{
        fontSize: Fonts.style[size].fontSize,
        lineHeight: Fonts.style[size].fontSize * 1.5,
        fontFamily: Fonts.style[size].fontFamily,
      }}
      {...rest}
    />
  );
};

TextField.propTypes = {
  theme: PropTypes.oneOf(['white', 'black']),
  size: PropTypes.oneOf(Object.keys(Fonts.style)),
  // Plus all props from react-native-material-textfield
};

TextField.defaultProps = {
  theme: 'black',
  size: 'M',
};

export default TextField;
