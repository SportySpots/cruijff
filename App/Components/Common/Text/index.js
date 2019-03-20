import React from 'react';
import PropTypes from 'prop-types';
import { Text as NativeText } from 'react-native';
import Colors from '../../../Themes/Colors';
import Fonts, { FontFamilies } from '../../../Themes/Fonts';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Text = ({
  children,
  family,
  size,
  color,
  bold,
  ...rest
}) => {
  const fontWeight = bold ? 'bold' : 'normal';
  const font = Fonts[size]; // { fontFamily: ..., fontSize: ... }
  const baseStyle = { backgroundColor: 'transparent' };
  const lineHeight = parseInt(1.5 * font.fontSize, 10);
  const style = Object.assign({}, baseStyle, font, { fontWeight, lineHeight });

  if (family) {
    style.fontFamily = FontFamilies[family];
  }

  return (
    <NativeText style={style} {...rest}>
      {children}
    </NativeText>
  );
};

Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  family: PropTypes.oneOf(Object.keys(FontFamilies)),
  size: PropTypes.oneOf(Object.keys(Fonts)),
  color: PropTypes.oneOf(Object.keys(Colors)),
  bold: PropTypes.bool,
  // Plus all other props associated to native Text elem
};

Text.defaultProps = {
  family: null,
  size: 'SM',
  color: null,
  bold: false,
};

export default Text;
