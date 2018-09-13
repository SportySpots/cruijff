import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown as DropdownMUI } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Dropdown = ({ theme, size, ...rest }) => {
  const isWhiteTheme = theme === 'white';

  return (
    <DropdownMUI
      labelFontSize={Fonts.style.M.fontSize}
      labelHeight={Fonts.style.M.fontSize * 1.5}
      labelTextStyle={{ fontFamily: Fonts.style.M.fontFamily }}
      errorColor={Colors.red}
      animationDuration={150}
      lineWidth={1}
      baseColor={isWhiteTheme ? Colors.white : Colors.black}
      tintColor={isWhiteTheme ? Colors.white : Colors.primaryGreen}
      activeLineWidth={2}
      renderAccessory={() => (
        <Icon
          size={24}
          name="keyboard-arrow-down"
          color={isWhiteTheme ? Colors.white : Colors.black}
        />
      )}
      style={{
        fontSize: Fonts.style[size].fontSize,
        lineHeight: Fonts.style[size].fontSize * 1.5,
        fontFamily: Fonts.style[size].fontFamily,
      }}
      {...rest}
    />
  );
};

Dropdown.propTypes = {
  theme: PropTypes.oneOf(['white', 'black']),
  size: PropTypes.oneOf(Object.keys(Fonts.style)),
  // Plus all props from react-native-material-textfield
};

Dropdown.defaultProps = {
  theme: 'black',
  size: 'M',
};

export default Dropdown;
