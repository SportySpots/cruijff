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
      labelTextStyle={{ fontFamily: Fonts.style.M.fontFamily }}
      labelHeight={1.5 * Fonts.style.M.fontSize}
      errorColor={Colors.red}
      animationDuration={150}
      lineWidth={1}
      baseColor={isWhiteTheme ? Colors.white : Colors.black}
      tintColor={isWhiteTheme ? Colors.white : Colors.primaryGreen}
      activeLineWidth={2}
      inputContainerPadding={14}
      style={{
        fontSize: Fonts.style[size].fontSize,
        fontWeight: 'normal',
        fontFamily: Fonts.style[size].fontFamily,
        lineHeight: 1.3 * Fonts.style[size].fontSize,
        marginTop: 8, // the lower the padding the greater the line height
        color: isWhiteTheme ? Colors.white : Colors.black,
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
