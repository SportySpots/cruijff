import React from 'react';
import PropTypes from 'prop-types';
import { Linking, TouchableOpacity, View } from 'react-native';
import Fonts from '../../../Themes/Fonts';
import Text from '../Text';

const Link = ({
  text,
  href,
  color,
  size,
}) => {
  const TextSize = Text[size];

  return (
    <TouchableOpacity onPress={() => Linking.openURL(href)}>
      <View>
        <TextSize style={{ color }}>
          {text}
        </TextSize>
      </View>
    </TouchableOpacity>
  );
};

Link.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(Fonts.style)),
};

Link.defaultProps = {
  text: '',
  href: '',
  color: 'black',
  size: 'M',
};

export default Link;
