import React from 'react';
import PropTypes from 'prop-types';
import { Text as NativeText } from 'react-native';
import extend from 'lodash/extend';
import Colors from '../../../Themes/Colors';
import Fonts, { FontFamilies } from '../../../Themes/Fonts';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Text = ({
  children,
  size,
  color: clr,
  regular,
  semibold,
  bold,
  center,
  underline,
  style: styl,
  ...rest
}) => {
  if (1 * regular + 1 * semibold + 1 * bold > 1) {
    throw new Error('regular, semibold or bold, only one can be set to true');
  }

  const font = Fonts[size]; // { fontFamily: ..., fontSize: ... }
  const baseStyle = { backgroundColor: Colors.transparent };
  const lineHeight = parseInt(1.5 * font.fontSize, 10);
  const color = clr ? Colors[clr] : Colors.black;
  const textAlign = center ? 'center' : 'left';
  const style = Object.assign({}, baseStyle, font, { lineHeight, color, textAlign });

  if (regular) {
    style.fontFamily = FontFamilies.regular;
  }
  if (semibold) {
    style.fontFamily = FontFamilies.semibold;
  }
  if (bold) {
    style.fontFamily = FontFamilies.bold;
  }

  if (underline) {
    extend(style, {
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textDecorationColor: color,
    });
  }

  return (
    <NativeText style={Object.assign({}, style, styl)} {...rest}>
      {children}
    </NativeText>
  );
};

Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  size: PropTypes.oneOf(Object.keys(Fonts)),
  color: PropTypes.oneOf(Object.keys(Colors)),
  regular: PropTypes.bool,
  semibold: PropTypes.bool,
  bold: PropTypes.bool,
  center: PropTypes.bool,
  underline: PropTypes.bool,
  style: PropTypes.object, // eslint-disable-line
  // Plus all other props associated to native Text comp
};

Text.defaultProps = {
  size: 'SM',
  color: null,
  regular: false,
  semibold: false,
  bold: false,
  center: false,
  underline: false,
  style: {},
};

export default Text;
