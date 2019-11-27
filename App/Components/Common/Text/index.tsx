import React from 'react';
import { Text as NativeText } from 'react-native';
import extend from 'lodash/extend';
import Colors from '../../../Themes/Colors';
import Fonts, { FontFamilies, IFont } from 'App/Themes/Fonts';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const defaultProps = {
  size: 'SM',
  color: null,
  regular: false,
  semibold: false,
  bold: false,
  center: false,
  underline: false,
  style: {},
};

interface IRequiredProps {
  // children: React.ReactChildren;
  children: string;
}

type IMergedProps = IRequiredProps & {
  size: keyof typeof Fonts;
  color: keyof typeof Colors;
  regular: boolean;
  semibold: boolean;
  bold: boolean;
  center: boolean;
  underline: boolean;
  style: any;
}

type IProps = IRequiredProps & Partial<IMergedProps>

const Text = (props: IProps) => {
  const mergedProps = {...defaultProps, ...props};

  const {
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
  } = mergedProps;

  if ([regular, semibold, bold].filter(p=>p).length > 1) {
    throw new Error('regular, semibold or bold, only one can be set to true');
  }

  const font: IFont = Fonts[size]; // { fontFamily: ..., fontSize: ... }
  const baseStyle = { backgroundColor: Colors.transparent };
  const lineHeight = Math.round(1.5 * font.fontSize);
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

export default Text;
