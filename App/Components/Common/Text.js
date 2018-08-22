import React from 'react';
import { StyleSheet, Text as NativeText } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../Themes/Colors';
import Fonts from '../../Themes/Fonts';

const Text = ({ style, ...props }) => (
  <NativeText style={[{ backgroundColor: 'transparent' }, style]} {...props} />
);

Text.propTypes = {
  style: PropTypes.any,
};

const sizes = ['S', 'SM', 'M', 'L'];

const styles = StyleSheet.create(sizes.reduce((acc, cur) => {
  acc[cur] = {
    ...Fonts.style[cur],
    color: Colors.black,
    lineHeight: Fonts.style[cur] * 1.5,
  };
  return acc;
}, {}));

sizes.forEach((size) => {
  const TextComponent = (props) => {
    const { style, bold, ...otherProps } = props;
    const finalStyles = [
      { backgroundColor: 'transparent' },
      styles[size],
      style,
    ];
    if (bold) {
      finalStyles.push({ fontFamily: Fonts.type.bold });
    }
    return (
      <Text style={finalStyles} {...otherProps} />
    );
  };
  TextComponent.propTypes = {
    style: PropTypes.any,
    bold: PropTypes.bool,
  };

  Text[size] = TextComponent;
});

export default Text;
