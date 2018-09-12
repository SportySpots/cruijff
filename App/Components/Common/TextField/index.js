import React from 'react';
import PropTypes from 'prop-types';
import { TextField as TextFieldMUI } from 'react-native-material-textfield';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const TextField = ({
  whiteColor,
  ...rest
}) => (
  <TextFieldMUI
    labelFontSize={Fonts.style.M.fontSize}
    labelHeight={Fonts.style.M.fontSize * 1.5}
    labelTextStyle={{ fontFamily: Fonts.style.M.fontFamily }}
    errorColor={Colors.red}
    animationDuration={150}
    baseColor={whiteColor ? Colors.white : Colors.black}
    tintColor={Colors.primaryGreen}
    activeLineWidth={1}
    style={{ lineHeight: Fonts.style.M.fontSize * 1.5 }}
    {...rest}
  />
);

TextField.propTypes = {
  whiteColor: PropTypes.bool,
  // Plus all props from react-native-material-textfield
};

TextField.defaultProps = {
  whiteColor: false,
};

export default TextField;
