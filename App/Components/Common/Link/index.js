import React from 'react';
import PropTypes from 'prop-types';
import { Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../Themes/Colors';
import Fonts from '../../../Themes/Fonts';
import Row from '../Row';
import Text from '../Text';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Link = ({
  text,
  href,
  color,
  iconName,
  size,
  underline,
}) => {
  const TextSize = Text[size];

  return (
    <TouchableOpacity onPress={() => { Linking.openURL(href); }}>
      <Row
        justifyContent="space-between"
        alignItems="center"
      >
        <TextSize
          style={{
            color,
            textDecorationLine: underline ? 'underline' : 'none',
            textDecorationStyle: 'solid',
            textDecorationColor: color,
          }}
        >
          {text}
        </TextSize>
        {!!iconName && (
          <Icon
            name={iconName}
            size={24}
            color={Colors.black}
          />
        )}
      </Row>
    </TouchableOpacity>
  );
};

Link.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
  color: PropTypes.string,
  iconName: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(Fonts.style)),
  underline: PropTypes.bool,
};

Link.defaultProps = {
  text: '',
  href: '',
  color: 'black',
  iconName: '',
  size: 'M',
  underline: false,
};

export default Link;
