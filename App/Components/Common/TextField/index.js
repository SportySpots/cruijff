import React from 'react';
import PropTypes from 'prop-types';
import { TextField as TextFieldMUI } from 'react-native-material-textfield';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';
// import trimLeft from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const TextField = ({
  whiteColor,
  // value,
  ...rest
}) => (
  <TextFieldMUI
    // value={(value && value.length > 0) ? trimLeft(value) : ' '}
    labelFontSize={Fonts.style.M.fontSize}
    labelTextStyle={{ fontFamily: Fonts.style.M.fontFamily }}
    errorColor={Colors.red}
    animationDuration={150}
    baseColor={whiteColor ? Colors.white : Colors.black}
    tintColor={Colors.primaryGreen}
    {...rest}
  />
);

TextField.propTypes = {
  whiteColor: PropTypes.bool,
  value: PropTypes.string,
  // Plus all props from react-native-material-textfield
};

TextField.defaultProps = {
  whiteColor: false,
  // value: '',
};

export default TextField;
